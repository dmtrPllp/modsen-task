import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Pagination } from 'src/utils/pagination/pagination.class';
import { UserMeetingService } from '../user-meeting/user-meeting.service';

import { CreateMeetingDto } from './dto/create-meeting.dto';
import { GetMeetingsDto } from './dto/get-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsRepository } from './meetings.repository';
import { MeetingIdResponse } from './response/link/meeting-id.response';
import {
  MeetingResponse,
  MeetingsFilterPaginationResponse,
} from './response/meeting.response';

@Injectable()
export class MeetingsService {
  constructor(
    private readonly meetingsRepository: MeetingsRepository,
    private readonly userMeetingService: UserMeetingService,
  ) {}

  public async create(
    createMeetingDto: CreateMeetingDto,
    createdBy: number,
  ): Promise<MeetingResponse> {
    return await this.meetingsRepository.create(createMeetingDto, createdBy);
  }

  public async getAllMeetings(
    getMeetingsDto: GetMeetingsDto,
  ): Promise<MeetingsFilterPaginationResponse> {
    const pagination = new Pagination(getMeetingsDto.page, getMeetingsDto.size);

    const { meetings, count } =
      await this.meetingsRepository.findMeetingsWithPagination(
        getMeetingsDto,
        pagination,
      );

    return pagination.getResponse(meetings, count);
  }
  public async updateMeeting(
    id: number,
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<MeetingResponse> {
    const meeting = await this.meetingsRepository.getMeetingById(id);

    if (!meeting) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    const updatedMeeting = await this.meetingsRepository.update(
      id,
      updateMeetingDto,
    );

    return updatedMeeting;
  }

  public async checkCreaterId(id: number, userId: number): Promise<boolean> {
    return this.meetingsRepository.checkCreaterId(id, userId);
  }

  public async getById(id: number): Promise<MeetingResponse> {
    const meeting = await this.meetingsRepository.getMeetingById(id);

    if (!meeting) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return meeting;
  }

  public async deleteMeeting(id: number): Promise<void> {
    await this.userMeetingService.deleteManyByMeetingId(id);

    return await this.meetingsRepository.deleteMeeting(id);
  }

  public async getMeetingsByOwnerId(
    createdBy: number,
  ): Promise<MeetingIdResponse[]> {
    return await this.meetingsRepository.getMeetingsByOwnerId(createdBy);
  }
}
