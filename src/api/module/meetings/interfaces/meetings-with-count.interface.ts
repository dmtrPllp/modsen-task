import { MeetingResponse } from '../response/meeting.response';

export interface MeetingsWithCountInterface {
  meetings: MeetingResponse[];

  count: number;
}
