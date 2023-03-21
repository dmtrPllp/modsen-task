import { Injectable } from '@nestjs/common';

import { InsensitiveSearch } from 'src/api/helper/interface/insensitive-search.type';
import { OrderByType } from 'src/api/helper/type/order-by.type';
import { Sort, SortMethod } from 'src/constants/sort.enum';
import { PrismaService } from 'src/modules/db/prisma.service';
import { Pagination } from 'src/utils/pagination/pagination.class';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { GetMeetingsDto } from './dto/get-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { MeetingsWithCountInterface } from './interfaces/meetings-with-count.interface';
import { MeetingIdResponse } from './response/link/meeting-id.response';
import { MeetingResponse } from './response/meeting.response';

@Injectable()
export class MeetingsRepository {
  constructor(private readonly db: PrismaService) {}

  private userSelect = {
    id: true,
    title: true,
    description: true,
    tags: true,
    startDate: true,
    location: true,
  };

  private fullUserSelect = {
    ...this.userSelect,
    users: {
      select: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    },
  };

  public async create(
    createMeetingDto: CreateMeetingDto,
    createdBy: number,
  ): Promise<MeetingResponse> {
    return await this.db.meeting.create({
      data: {
        ...createMeetingDto,
        createdBy,
      },
    });
  }

  public async findMeetingsWithPagination(
    getMeetingsDto: GetMeetingsDto,
    pagination: Pagination,
  ): Promise<MeetingsWithCountInterface> {
    const { search, startDate, sortById, sortByStartDate } = getMeetingsDto;

    const searchMode: InsensitiveSearch = {
      contains: search,
      mode: 'insensitive',
    };

    const filters = startDate
      ? {
          startDate: {
            gte: new Date(startDate),
          },
        }
      : {};

    const conditions = {
      ...filters,
      ...(search
        ? {
            title: {
              ...searchMode,
            },
          }
        : {}),
    };

    const orderBy: OrderByType[] = [];

    if (sortById) {
      orderBy.push({ id: Sort[sortById] as SortMethod });
    }

    if (sortByStartDate) {
      orderBy.push({ startDate: Sort[sortByStartDate] as SortMethod });
    }

    const meetings = await this.db.meeting.findMany({
      where: conditions,
      orderBy: orderBy,
      ...pagination.getPagination(),
      select: this.userSelect,
    });

    const count =
      (await this.db.meeting.count({
        where: conditions,
      })) || 0;

    return { meetings, count };
  }

  public async checkCreaterId(id: number, userId: number): Promise<boolean> {
    const creater = await this.db.meeting.findFirst({
      where: {
        id,
        createdBy: userId,
      },
    });

    if (!creater) return false;

    return true;
  }

  public async getMeetingsByOwnerId(
    createdBy: number,
  ): Promise<MeetingIdResponse[]> {
    return await this.db.meeting.findMany({
      where: {
        createdBy,
      },
    });
  }

  public async getMeetingById(id: number): Promise<MeetingResponse> {
    return await this.db.meeting.findUnique({
      where: {
        id,
      },
      select: this.fullUserSelect,
    });
  }

  public async update(
    id: number,
    updateMeetingDto: UpdateMeetingDto,
  ): Promise<MeetingResponse> {
    return await this.db.meeting.update({
      where: {
        id,
      },
      data: updateMeetingDto,
    });
  }

  public async deleteMeeting(id: number): Promise<void> {
    await this.db.meeting.delete({
      where: {
        id,
      },
    });
  }
}
