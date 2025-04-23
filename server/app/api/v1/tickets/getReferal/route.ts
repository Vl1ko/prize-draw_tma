import { prisma } from '@/prisma/prisma-client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const userID = String(req.nextUrl.searchParams.get('userID') || ''); // Get the query parameter from the request URL
  const lotteryStatus = String(req.nextUrl.searchParams.get('lotteryStatus') || ''); // Get the query parameter from the request URL

  if (userID == '') {
    // return NextResponse.json({ error: 'Bad Request' }, { status: 400 }); // Return the fetched users as JSON
    const users = await prisma.ticket.findMany();
    return NextResponse.json(users);
  } else {
    const inactiveTickets = await prisma.ticket.findMany({
      where: {
        userId: `${userID}`,
        // lotteryId: Number(lotteryId),
        ticketFrom: 'buy',
      },
    });

    const activeTickets = await prisma.ticket.findMany({
      where: {
        userId: `${userID}`,
        // lotteryId: Number(lotteryId),
        ticketFrom: 'user',
      },
    });
    return NextResponse.json(activeTickets.length - inactiveTickets.length); // Return the fetched users as JSON
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const user = await prisma.ticket.create({
    data,
  });

  return NextResponse.json(user);
}
