import { ApiProperty } from '@nestjs/swagger';
import { Meeting } from '@prisma/client';
import { Type } from 'class-transformer';
import { OptionalProperty, swaggerType } from 'src/api/helper/swagger/utils';
import { PaginationResponse } from 'src/utils/pagination/interfaces/pagination-response.type';
import { PaginationMetadataResponse } from 'src/utils/pagination/responses/pagination-metadata.response';
import { UserMeetingsResponse } from '../../users/response/link/user-in-meetings.response';

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

  @ApiProperty(swaggerType(UserMeetingsResponse))
  users?: UserMeetingsResponse[];
}

export class MeetingsFilterPaginationResponse
  extends PaginationMetadataResponse
  implements PaginationResponse<MeetingResponse>
{
  @ApiProperty(swaggerType([MeetingResponse]))
  data: MeetingResponse[];
}
