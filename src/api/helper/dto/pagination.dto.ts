import { IsPagination } from '../swagger/utils';

export class PaginationDto {
  @IsPagination()
  page: string;

  @IsPagination()
  size: string;
}
