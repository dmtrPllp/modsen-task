import { ApiProperty } from '@nestjs/swagger';

import { Meeting } from '@prisma/client';

import { IsArray, IsDateString, IsString } from 'class-validator';

type MeetingOmitId = Omit<Meeting, 'id' | 'createdBy'>;

export class CreateMeetingDto implements MeetingOmitId {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  tags: string[];

  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsString()
  location: string;
}
