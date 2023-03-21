import { ApiProperty } from '@nestjs/swagger';

import { User, UserMeeting } from '@prisma/client';

import { swaggerType } from 'src/api/helper/swagger/utils';

type UserMeetingOmitMeetingIdUserId = Omit<UserMeeting, 'meetingId' | 'userId'>;

type UserInMeetingType = Pick<User, 'id' | 'email'>;

class UserInMeetingResponse implements UserInMeetingType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;
}

export class UserMeetingsResponse implements UserMeetingOmitMeetingIdUserId {
  @ApiProperty(swaggerType(UserInMeetingResponse))
  user: UserInMeetingResponse;
}
