import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CreateUserMeetingDto } from './dto/create-user-meeting.dto';
import { UserMeetingRepository } from './user-meeting.repository';

@Injectable()
export class UserMeetingService {
  constructor(private readonly userMeetingRepository: UserMeetingRepository) {}

  public async addUserToMeeting(
    createUserMeetingDto: CreateUserMeetingDto,
    userId: number,
  ): Promise<void> {
    return await this.userMeetingRepository.addUserToMeeting(
      createUserMeetingDto,
      userId,
    );
  }

  public async deleteUserFromMeeting(
    meetingId: number,
    userId: number,
  ): Promise<void> {
    const record = await this.userMeetingRepository.getById(meetingId, userId);

    if (!record) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return await this.userMeetingRepository.deleteUserFromMeeting(
      meetingId,
      userId,
    );
  }

  public async deleteManyByMeetingId(meetingId: number): Promise<void> {
    return await this.userMeetingRepository.deleteManyByMeetingId(meetingId);
  }
}
