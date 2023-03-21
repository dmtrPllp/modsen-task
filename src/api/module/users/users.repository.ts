import { Injectable } from '@nestjs/common';

import { User } from '@prisma/client';

import { PrismaService } from 'src/modules/db/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponse } from './response/user.response';

@Injectable()
export class UsersRepository {
  constructor(private readonly db: PrismaService) {}

  private userSelect = {
    id: true,
    email: true,
  };

  private fullUserSelect = {
    id: true,
    email: true,
    role: {
      select: {
        id: true,
        title: true,
        permissions: {
          select: {
            id: true,
            method: true,
            descriptor: true,
          },
        },
      },
    },
  };

  public async createUser(
    createUserDto: CreateUserDto,
    hashedPassword: string,
  ): Promise<UserResponse> {
    return await this.db.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
      select: this.fullUserSelect,
    });
  }

  public async getAllUsers(): Promise<UserResponse[]> {
    return await this.db.user.findMany({
      select: this.userSelect,
    });
  }

  public async getUserById(id: number): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: this.userSelect,
    });
  }

  public async getUserByEmail(email: string): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
      select: this.userSelect,
    });
  }

  public async getUserByEmailWithPassword(email: string): Promise<User> {
    return await this.db.user.findUnique({
      where: {
        email,
      },
    });
  }

  public async getUserByIdWithPermissions(id: number): Promise<UserResponse> {
    return await this.db.user.findUnique({
      where: {
        id,
      },
      select: {
        ...this.fullUserSelect,
      },
    });
  }
}
