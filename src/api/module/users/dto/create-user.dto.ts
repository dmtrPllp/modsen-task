import { ApiProperty } from '@nestjs/swagger';

import { User } from '@prisma/client';

import { IsEmail, IsInt, IsPositive, IsString } from 'class-validator';

import { OptionalProperty } from 'src/api/helper/swagger/utils';

type UserRegistrationType = Pick<User, 'email' | 'password'>;

export class CreateUserDto implements UserRegistrationType {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @OptionalProperty()
  @IsInt()
  @IsPositive()
  roleId?: number;
}
