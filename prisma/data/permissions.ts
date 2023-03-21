import { Method } from '@prisma/client';

export const permissions = [
  {
    method: Method.GET,
    descriptor: 'MeetingsController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'UserMeetingController',
    roleId: 1,
  },
  {
    method: Method.DELETE,
    descriptor: 'UserMeetingController',
    roleId: 1,
  },
  {
    method: Method.GET,
    descriptor: 'AuthController',
    roleId: 1,
  },
  {
    method: Method.GET,
    descriptor: 'AuthController',
    roleId: 2,
  },
  {
    method: Method.GET,
    descriptor: 'MeetingsController',
    roleId: 2,
  },
  {
    method: Method.POST,
    descriptor: 'MeetingsController',
    roleId: 2,
  },
  {
    method: Method.PUT,
    descriptor: 'MeetingsController',
    roleId: 2,
  },
  {
    method: Method.PATCH,
    descriptor: 'MeetingsController',
    roleId: 2,
  },
  {
    method: Method.DELETE,
    descriptor: 'MeetingsController',
    roleId: 2,
  },
  {
    method: Method.POST,
    descriptor: 'UserMeetingController',
    roleId: 2,
  },
  {
    method: Method.DELETE,
    descriptor: 'UserMeetingController',
    roleId: 2,
  },
  {
    method: Method.POST,
    descriptor: 'AuthController',
    roleId: 1,
  },
  {
    method: Method.POST,
    descriptor: 'AuthController',
    roleId: 2,
  },
];
