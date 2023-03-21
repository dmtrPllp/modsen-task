import { Module } from '@nestjs/common';

import { UserMeetingService } from './user-meeting.service';
import { UserMeetingController } from './user-meeting.controller';
import { UserMeetingRepository } from './user-meeting.repository';
import { PrismaModule } from 'src/modules/db/prisma.module';

@Module({
  controllers: [UserMeetingController],
  providers: [UserMeetingService, UserMeetingRepository],
  imports: [PrismaModule],
})
export class UserMeetingModule {}
