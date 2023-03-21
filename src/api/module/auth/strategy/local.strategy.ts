import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-local';

import { UserResponse } from '../../users/response/user.response';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
    });
  }

  public async validate(
    email: string,
    password: string,
  ): Promise<UserResponse> {
    const user = await this.authService.getAuthenticatedUser(email, password);

    return user;
  }
}
