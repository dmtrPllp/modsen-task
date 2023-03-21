import { ApiProperty } from '@nestjs/swagger';

import { Meeting } from '@prisma/client';

type MeetingIdType = Pick<Meeting, 'id'>;

export class MeetingIdResponse implements MeetingIdType {
  @ApiProperty()
  id: number;
}
