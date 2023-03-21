import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Query,
  Req,
  Delete,
  Patch,
  Param,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { MeetingsService } from './meetings.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { swaggerType } from 'src/api/helper/swagger/utils';
import {
  MeetingResponse,
  MeetingsFilterPaginationResponse,
} from './response/meeting.response';
import { GetMeetingsDto } from './dto/get-meeting.dto';
import RequestWithUser from '../auth/interface/request-with-user.interface';
import { UpdateMeetingDto } from './dto/update-meeting.dto';

@ApiTags('meetings')
@Controller('meetings')
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @ApiCreatedResponse(swaggerType(MeetingResponse))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  public create(
    @Body() createMeetingDto: CreateMeetingDto,
    @Req() req: RequestWithUser,
  ): Promise<MeetingResponse> {
    return this.meetingsService.create(createMeetingDto, req.user.id);
  }

  @ApiOkResponse(swaggerType(MeetingsFilterPaginationResponse))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  public getAllMeetings(
    @Query() getMeetingsDto: GetMeetingsDto,
  ): Promise<MeetingsFilterPaginationResponse> {
    return this.meetingsService.getAllMeetings(getMeetingsDto);
  }

  @ApiOkResponse(swaggerType(MeetingResponse))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public getById(@Param('id') id: string): Promise<MeetingResponse> {
    return this.meetingsService.getById(+id);
  }

  @ApiOkResponse(swaggerType(MeetingResponse))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Patch()
  public updateMeeting(
    @Body() updateMeetingDto: UpdateMeetingDto,
    @Query('id') id: string,
  ): Promise<MeetingResponse> {
    return this.meetingsService.updateMeeting(+id, updateMeetingDto);
  }

  @ApiNoContentResponse()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete()
  public deleteMeeting(@Query('id') id: string): Promise<void> {
    return this.meetingsService.deleteMeeting(+id);
  }
}
