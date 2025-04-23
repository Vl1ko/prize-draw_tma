import { prisma } from '@/prisma/prisma-client';
import { NextResponse, NextRequest } from 'next/server';

// export async function GET(req: NextRequest) {
//   const query = String(req.nextUrl.searchParams.get('id') || ''); // Get the query parameter from the request URL

//   if (query == '') {
//     return NextResponse.json({ error: 'Bad Request' }, { status: 400 }); // Return the fetched users as JSON
//   } else {
//     const users = await prisma.lotery.findMany({
//       where: {
//         id: Number(query),
//       },
//     });
//     return NextResponse.json(users); // Return the fetched users as JSON
//   }
// }

export async function POST(req: NextRequest) {
  const data = await req.json(); // Extract JSON data from the request

  function getRandom(max) {
    return Number(Math.floor(Math.random() * (Number(max) + 1)));
  }

  // const user = await prisma.user.create({
  //   data,
  // }); // Create a new user with the provided data

  const users = await prisma.ticket.findMany({
    where: {
      id: data.id,
    },
  });

  const lotery = await prisma.lotery.findFirst({
    where: {
      id: data.id,
    },
  });

  if (lotery?.winner == null) {
    const user = await prisma.lotery.update({
      where: {
        id: data.id,
      },
      data: {
        winner: users[`${getRandom(users.length)}`].userId,
      },
    });

    return NextResponse.json(user);
  }
}
