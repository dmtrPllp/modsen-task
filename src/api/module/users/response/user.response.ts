import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { swaggerType } from 'src/api/helper/swagger/utils';
import { MeetingIdResponse } from '../../meetings/response/link/meeting-id.response';
import { UserRoleResponse } from './link/user-role.response';

type UserOmitMetadata = Omit<
  User,
  'createdAt' | 'createdBy' | 'password' | 'roleId'
>;

export class UserResponse implements UserOmitMetadata {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty(swaggerType(UserRoleResponse))
  role?: UserRoleResponse;

  @ApiProperty(swaggerType(UserRoleResponse))
  createdMeetings?: MeetingIdResponse[];
}
