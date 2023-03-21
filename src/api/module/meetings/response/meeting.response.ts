import { ApiProperty } from '@nestjs/swagger';
import { Meeting } from '@prisma/client';
import { Type } from 'class-transformer';
import { OptionalProperty } from 'src/api/helper/swagger/utils';

type MeetingType = Omit<Meeting, 'createdBy'> &
  Partial<Pick<Meeting, 'createdBy'>>;

export class MeetingResponse implements MeetingType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @Type(() => String)
  tags: string[];

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  location: string;

  @OptionalProperty()
  createdBy?: number;
}
