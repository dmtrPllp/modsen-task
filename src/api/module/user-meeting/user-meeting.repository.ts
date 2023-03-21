import { Injectable } from '@nestjs/common';
import { UserMeeting } from '@prisma/client';

import { PrismaService } from 'src/modules/db/prisma.service';
import { CreateUserMeetingDto } from './dto/create-user-meeting.dto';

@Injectable()
export class UserMeetingRepository {
  constructor(private readonly db: PrismaService) {}

  public async addUserToMeeting(
    createUserMeetingDto: CreateUserMeetingDto,
    userId: number,
  ): Promise<void> {
    await this.db.userMeeting.create({
      data: {
        ...createUserMeetingDto,
        userId,
      },
    });
  }

  public async getById(
    meetingId: number,
    userId: number,
  ): Promise<UserMeeting> {
    console.log(meetingId);
    console.log(userId);

    return await this.db.userMeeting.findUnique({
      where: {
        userId_meetingId: { userId, meetingId },
      },
    });
  }

  public async deleteUserFromMeeting(
    meetingId: number,
    userId: number,
  ): Promise<void> {
    console.log(meetingId);
    console.log(userId);

    await this.db.userMeeting.delete({
      where: {
        userId_meetingId: { userId, meetingId },
      },
    });
  }
}
