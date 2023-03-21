import { IsEnum } from 'class-validator';

export type SortMethod = 'asc' | 'desc';

export enum Sort {
  asc = 'asc',
  desc = 'desc',
}

export const IsSort = () => IsEnum(Sort, { message: 'Invalid sort method' });
