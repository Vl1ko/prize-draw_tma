import { prisma } from './prisma-client';

async function up() {
  // await prisma.user.createMany({
  //   data: [
  //     {
  //       tgID: '5000281278',
  //       inviteId: '5000281278',
  //       userName: 'Sergey',
  //     },
  //     // {
  //     //   tgID: '435746344371',
  //     //   inviteId: '69413684164',
  //     // },
  //   ],
  // });

  await prisma.lotery.createMany({
    data: [
      {
        title: 'IPHONE 15 PRO MAX НА 512 GB',
        endTime: new Date(2024, 12, 1),
      },
    ],
  });

  // await prisma.ticket.createMany({
  //   data: [
  //     {
  //       ticketId: '1234-5443-4534',
  //       lotteryId: 1,
  //       userId: '5000281278',
  //       ticketFrom: 'buy',
  //     },
  //     {
  //       ticketId: '1234-5443-4534',
  //       userId: '5000281278',
  //       ticketFrom: 'inactive',
  //     },
  //   ],
  // });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ticket" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Lotery" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.error(error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
