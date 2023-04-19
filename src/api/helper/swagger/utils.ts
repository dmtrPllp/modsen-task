import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IsNumberString, IsOptional } from 'class-validator';

export const swaggerType = <T>(type: T) => ({ type });

export const OptionalProperty = () =>
  applyDecorators(ApiProperty({ required: false }), IsOptional());

export const IsPagination = () =>
  applyDecorators(ApiProperty({ required: true }), IsNumberString());
