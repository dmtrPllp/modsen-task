import { Module } from '@nestjs/common';

import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { MeetingsRepository } from './meetings.repository';
import { PrismaModule } from 'src/modules/db/prisma.module';
import { UserMeetingModule } from '../user-meeting/user-meeting.module';

@Module({
  controllers: [MeetingsController],
  providers: [MeetingsService, MeetingsRepository],
  imports: [PrismaModule, UserMeetingModule],
  exports: [MeetingsService],
})
export class MeetingsModule {}
