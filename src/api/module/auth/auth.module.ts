import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { SessionsModule } from '../sessions/sessions.module';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtRefreshTokenStrategy } from './strategy/jwt-refresh-token.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { MeetingsModule } from '../meetings/meetings.module';
import { PrismaModule } from 'src/modules/db/prisma.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtRefreshTokenStrategy, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule,
    JwtModule.register({}),
    PrismaModule,
    SessionsModule,
    MeetingsModule,
  ],
})
export class AuthModule {}
