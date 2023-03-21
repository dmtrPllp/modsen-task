import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { IsOptional } from 'class-validator';

export const swaggerType = (type) => ({ type });

export const OptionalProperty = () =>
  applyDecorators(ApiProperty({ required: false }), IsOptional());
