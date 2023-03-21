import { HttpException, HttpStatus } from '@nestjs/common';
import { Pagination as PaginationType } from '../../constants/pagination.type';
import { PaginationResponse } from './interfaces/pagination-response.type';

export class Pagination {
  private readonly MAX_SIZE = 100;
  private readonly page: number;
  private readonly size: number;

  constructor(page: string, size: string) {
    this.page = +page;
    this.size = +size;

    if (this.size > this.MAX_SIZE) {
      throw new HttpException(
        `Max size is ${this.MAX_SIZE}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getPagination(): PaginationType {
    return { skip: (this.page - 1) * this.size, take: this.size + 1 };
  }

  public getResponse<T>(data: T[], count: number): PaginationResponse<T> {
    const isLast = data.length <= this.size;

    if (!isLast) {
      data.pop();
    }

    return {
      data,
      isLast,
      page: this.page,
      size: this.size,
      totalCount: count,
    };
  }
}
