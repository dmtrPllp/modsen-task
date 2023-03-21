import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/db/prisma.service';
import { MeetingIdResponse } from './response/link/meeting-id.response';

@Injectable()
export class MeetingsRepository {
  constructor(private readonly db: PrismaService) {}

  public async getMeetingsByOwnerId(
    createdBy: number,
  ): Promise<MeetingIdResponse[]> {
    return await this.db.meeting.findMany({
      where: {
        createdBy,
      },
    });
  }
}
