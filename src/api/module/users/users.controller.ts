import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { swaggerType } from 'src/api/helper/swagger/utils';
import { UserResponse } from './response/user.response';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiCreatedResponse(swaggerType(UserResponse))
  @Post()
  public create(@Body() createUserDto: CreateUserDto): Promise<UserResponse> {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse(swaggerType(UserResponse))
  @Get()
  public findAll(): Promise<UserResponse[]> {
    return this.usersService.getAllUsers();
  }

  @ApiOkResponse(swaggerType(UserResponse))
  @Get(':id')
  public findOne(@Param('id') id: string): Promise<UserResponse> {
    return this.usersService.getUserById(+id);
  }
}
