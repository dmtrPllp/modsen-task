import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';

import { SessionsService } from '../sessions/sessions.service';
import { UserResponse } from '../users/response/user.response';
import { UsersService } from '../users/users.service';
import { UserRegistrationDto } from './dto/user-registration.dto';
import CookieWithRefreshToken from './interface/cookie-with-refresh-token.interface';
import RequestWithUser from './interface/request-with-user.interface';
import TokenPayload from './interface/token-payload.interface';
import { AccessTokenResponse } from './response/access-token.response';
import { UserLoginResponse } from './response/user-login.reponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly sessionsService: SessionsService,
    private readonly configService: ConfigService,
  ) {}

  private async verifyPassword(
    plainTextPassword: string,
    user: User,
  ): Promise<void> {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string,
  ): Promise<UserResponse> {
    try {
      const user = await this.usersService.getUserByEmailWithPassword(email);

      await this.verifyPassword(plainTextPassword, user);

      user.password = undefined;

      return user;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  public async registration(
    registrationDto: UserRegistrationDto,
  ): Promise<void> {
    await this.usersService.create(registrationDto);
  }

  public async login(req: RequestWithUser): Promise<UserLoginResponse> {
    const accessToken = this.getAccessJwtToken(req.user.id);

    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(req.user.id);

    await this.sessionsService.createOrUpdateSessionByUserId(
      req.user.id,
      refreshToken,
    );

    const user = await this.usersService.getFullUserById(req.user.id);

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  public getAccessJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };

    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return token;
  }

  public getCookieWithJwtRefreshToken(userId: number): CookieWithRefreshToken {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const refreshTokenCookie = cookie.serialize('refreshToken', token, {
      httpOnly: true,
      path: '/',
      maxAge: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    return {
      refreshTokenCookie,
      token,
    };
  }

  public async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<UserResponse> {
    const refreshTokenFromDb = await this.sessionsService.getRefreshToken(
      userId,
    );

    if (refreshToken !== refreshTokenFromDb) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.usersService.getUserById(userId);

    return user;
  }

  public async getCurrentUser(req: RequestWithUser): Promise<UserResponse> {
    const user = await this.usersService.getFullUserById(req.user.id);

    return user;
  }

  public async refresh(req: RequestWithUser): Promise<AccessTokenResponse> {
    const accessToken = this.getAccessJwtToken(req.user.id);

    const { refreshTokenCookie, token: refreshToken } =
      this.getCookieWithJwtRefreshToken(req.user.id);

    await this.sessionsService.createOrUpdateSessionByUserId(
      req.user.id,
      refreshToken,
    );

    req.res.setHeader('Set-Cookie', refreshTokenCookie);

    return { accessToken };
  }

  public async removeRefreshToken(req: RequestWithUser): Promise<void> {
    await this.sessionsService.removeRefreshToken(req.user.id);

    req.res.setHeader('Set-Cookie', this.getCookieForLogout());
  }

  private getCookieForLogout(): string {
    const cookieForLogout = cookie.serialize('refreshToken', null, {
      httpOnly: true,
      path: '/',
      maxAge: 0,
    });

    return cookieForLogout;
  }
}
