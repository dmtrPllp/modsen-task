import { ApiProperty } from '@nestjs/swagger';

import { PaginationResponse } from '../interfaces/pagination-response.type';

type MetadataResponse = Omit<PaginationResponse<any>, 'data'>;

export class PaginationMetadataResponse implements MetadataResponse {
  @ApiProperty()
  isLast: boolean;

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  totalCount: number;
}
