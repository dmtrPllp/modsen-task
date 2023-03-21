import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { CreateUserMeetingDto } from './dto/create-user-meeting.dto';
import { UserMeetingService } from './user-meeting.service';

@ApiTags('user-meeting')
@Controller('user-meeting')
export class UserMeetingController {
  constructor(private readonly userMeetingService: UserMeetingService) {}

  @ApiCreatedResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public addUserToMeeting(
    @Body() createUserMeetingDto: CreateUserMeetingDto,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    return this.userMeetingService.addUserToMeeting(
      createUserMeetingDto,
      req.user.id,
    );
  }

  @ApiNoContentResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  public deleteMeeting(
    @Query('id') id: string,
    @Req() req: RequestWithUser,
  ): Promise<void> {
    return this.userMeetingService.deleteUserFromMeeting(+id, req.user.id);
  }
}
