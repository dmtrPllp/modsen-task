import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import appConfig from 'src/configuration/app.config';
import { PrismaModule } from 'src/modules/db/prisma.module';
import { MeetingsModule } from './module/meetings/meetings.module';
import { SessionsModule } from './module/sessions/sessions.module';
import { AuthModule } from './module/auth/auth.module';
import { UsersModule } from './module/users/users.module';
import { UserMeetingModule } from './module/user-meeting/user-meeting.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_HOST: Joi.string().required(),
        APP_PORT: Joi.number().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_SECRET: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    PrismaModule,
    MeetingsModule,
    SessionsModule,
    AuthModule,
    UsersModule,
    UserMeetingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
