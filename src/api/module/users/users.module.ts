import { Module } from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { MeetingsModule } from '../meetings/meetings.module';
import { PrismaModule } from 'src/modules/db/prisma.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  imports: [PrismaModule, MeetingsModule],
  exports: [UsersService],
})
export class UsersModule {}
