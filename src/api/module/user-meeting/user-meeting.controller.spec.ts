import { Test, TestingModule } from '@nestjs/testing';
import { UserMeetingController } from './user-meeting.controller';
import { UserMeetingService } from './user-meeting.service';

describe('UserMeetingController', () => {
  let controller: UserMeetingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMeetingController],
      providers: [UserMeetingService],
    }).compile();

    controller = module.get<UserMeetingController>(UserMeetingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
