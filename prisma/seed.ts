import { PrismaClient } from '@prisma/client';

import { meetings } from './data/meetings';
import { permissions } from './data/permissions';
import { roles } from './data/roles';
import { users } from './data/users';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: roles,
  });

  await prisma.permission.createMany({
    data: permissions,
  });

  await prisma.user.createMany({
    data: users,
  });

  await prisma.meeting.createMany({
    data: meetings,
  });

  await prisma.$queryRaw`ALTER SEQUENCE roles_id_seq RESTART WITH 3;`;
  await prisma.$queryRaw`ALTER SEQUENCE meetings_id_seq RESTART WITH 4;`;
  await prisma.$queryRaw`ALTER SEQUENCE permissions_id_seq RESTART WITH 15;`;
  await prisma.$queryRaw`ALTER SEQUENCE users_id_seq RESTART WITH 4;`;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
