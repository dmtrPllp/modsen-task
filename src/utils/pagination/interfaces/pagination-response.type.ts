export type PaginationResponse<T> = {
  data: T[];
  isLast: boolean;
  page: number;
  size: number;
  totalCount: number;
};
