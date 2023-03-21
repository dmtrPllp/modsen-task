import { ApiProperty } from '@nestjs/swagger';

import { UserMeeting } from '@prisma/client';

import { IsNumber, IsPositive } from 'class-validator';

type UserMeetingOmitUserId = Omit<UserMeeting, 'userId'>;

export class CreateUserMeetingDto implements UserMeetingOmitUserId {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  meetingId: number;
}
