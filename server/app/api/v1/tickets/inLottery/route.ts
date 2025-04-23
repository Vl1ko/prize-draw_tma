import { prisma } from '@/prisma/prisma-client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const userID = String(req.nextUrl.searchParams.get('userID') || ''); // Get the query parameter from the request URL
  const lotteryID = String(req.nextUrl.searchParams.get('lotteryID') || ''); // Get the query parameter from the request URL

  if (userID == '' || lotteryID == '') {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 }); // Return the fetched users as JSON
  } else {
    const users = await prisma.ticket.findMany({
      where: {
        userId: String(userID),
        lotteryId: Number(lotteryID),
      },
    });
    return NextResponse.json(users.length); // Return count of the tickets
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json(); // Extract JSON data from the request

  const user = await prisma.ticket.findFirst({
    where: {
      userId: data.userID,
      ticketId: 'none',
    },
  });

  console.log(user);

  return NextResponse.json(user);
}
