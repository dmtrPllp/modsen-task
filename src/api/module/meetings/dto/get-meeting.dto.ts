import { IsDateString, IsString } from 'class-validator';

import { PaginationDto } from 'src/api/helper/dto/pagination.dto';
import { OptionalProperty } from 'src/api/helper/swagger/utils';
import { IsSort, Sort } from 'src/constants/sort.enum';

export class GetMeetingsDto extends PaginationDto {
  @OptionalProperty()
  @IsString()
  search: string;

  @OptionalProperty()
  @IsDateString()
  startDate?: Date;

  @OptionalProperty()
  @IsSort()
  sortById?: Sort;

  @OptionalProperty()
  @IsSort()
  sortByStartDate?: Sort;
}
