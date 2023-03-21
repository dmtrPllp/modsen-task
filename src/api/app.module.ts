import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import * as Joi from 'joi';

import appConfig from 'src/configuration/app.config';
import { PrismaModule } from 'src/modules/db/prisma.module';
import { MeetingsModule } from './module/meetings/meetings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      expandVariables: true,
      validationSchema: Joi.object({
        APP_HOST: Joi.string().required(),
        APP_PORT: Joi.number().required(),
      }),
    }),
    PrismaModule,
    MeetingsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
