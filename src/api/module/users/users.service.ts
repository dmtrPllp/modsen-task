import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import * as bcrypt from 'bcrypt';
import { MeetingsService } from '../meetings/meetings.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response/user.response';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly meetingsService: MeetingsService,
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersRepository.getUserByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('Already exists', HttpStatus.CONFLICT);
    }

    const { password } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.createUser(createUserDto, hashedPassword);
  }

  public async getAllUsers(): Promise<UserResponse[]> {
    return await this.usersRepository.getAllUsers();
  }

  public async getUserById(id: number): Promise<UserResponse> {
    return await this.usersRepository.getUserById(id);
  }

  public async getUserByEmailWithPassword(email: string): Promise<User> {
    return await this.usersRepository.getUserByEmailWithPassword(email);
  }

  public async getFullUserById(id: number): Promise<UserResponse> {
    const user = await this.usersRepository.getUserByIdWithPermissions(id);

    const createdMeetings = await this.meetingsService.getMeetingsByOwnerId(id);

    return { ...user, createdMeetings };
  }
}
