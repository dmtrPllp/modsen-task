import { Injectable } from '@nestjs/common';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsRepository } from './meetings.repository';
import { MeetingIdResponse } from './response/link/meeting-id.response';

@Injectable()
export class MeetingsService {
  constructor(private readonly meetingsRepository: MeetingsRepository) {}

  create(createMeetingDto: CreateMeetingDto) {
    return 'This action adds a new meeting';
  }

  findAll() {
    return `This action returns all meetings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} meeting`;
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return `This action updates a #${id} meeting`;
  }

  remove(id: number) {
    return `This action removes a #${id} meeting`;
  }

  public async getMeetingsByOwnerId(
    createdBy: number,
  ): Promise<MeetingIdResponse[]> {
    return await this.meetingsRepository.getMeetingsByOwnerId(createdBy);
  }
}
