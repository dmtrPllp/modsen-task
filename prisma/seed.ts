import { PrismaClient } from '@prisma/client';

import { meetings } from './data/meetings';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        title: 'USER',
      },
      {
        title: 'ORGANIZER',
      },
    ],
  });

  await prisma.permission.createMany({
    data: [
      {
        method: 'GET',
        descriptor: 'MeetingsController',
        roleId: 1,
      },
      {
        method: 'POST',
        descriptor: 'UserMeetingController',
        roleId: 1,
      },
      {
        method: 'DELETE',
        descriptor: 'UserMeetingController',
        roleId: 1,
      },
      {
        method: 'GET',
        descriptor: 'AuthController',
        roleId: 1,
      },
      {
        method: 'GET',
        descriptor: 'AuthController',
        roleId: 2,
      },
      {
        method: 'GET',
        descriptor: 'MeetingsController',
        roleId: 2,
      },
      {
        method: 'POST',
        descriptor: 'MeetingsController',
        roleId: 2,
      },
      {
        method: 'PUT',
        descriptor: 'MeetingsController',
        roleId: 2,
      },
      {
        method: 'PATCH',
        descriptor: 'MeetingsController',
        roleId: 2,
      },
      {
        method: 'DELETE',
        descriptor: 'MeetingsController',
        roleId: 2,
      },
      {
        method: 'POST',
        descriptor: 'UserMeetingController',
        roleId: 2,
      },
      {
        method: 'DELETE',
        descriptor: 'UserMeetingController',
        roleId: 2,
      },
      {
        method: 'POST',
        descriptor: 'AuthController',
        roleId: 1,
      },
      {
        method: 'POST',
        descriptor: 'AuthController',
        roleId: 2,
      },
    ],
  });

  await prisma.role.createMany({
    data: [
      {
        title: 'USER',
      },
      {
        title: 'ORGANIZER',
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: 'string@mail.ru',
        password:
          '$2b$10$IavJbTIA1wrHlpgXc1v1y.WpqBSh.YVS.QJPi0cHxvx4pf9D3YxP6',
        roleId: 1,
      },
      {
        email: 'string2@mail.ru',
        password:
          '$2b$10$IavJbTIA1wrHlpgXc1v1y.WpqBSh.YVS.QJPi0cHxvx4pf9D3YxP6',
        roleId: 2,
      },
      {
        email: 'string3@mail.ru',
        password:
          '$2b$10$IavJbTIA1wrHlpgXc1v1y.WpqBSh.YVS.QJPi0cHxvx4pf9D3YxP6',
        roleId: 2,
      },
    ],
  });

  await prisma.meeting.createMany({
    data: meetings,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
