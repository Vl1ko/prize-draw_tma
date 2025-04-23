import { prisma } from '@/prisma/prisma-client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const tgID = String(req.nextUrl.searchParams.get('tgID') || ''); // Get the query parameter from the request URL
  const inviteID = String(req.nextUrl.searchParams.get('inviteID') || ''); // Get the query parameter from the request URL

  if (tgID == '') {
    if (inviteID == '') {
      const users = await prisma.user.findMany(); // Fetch all users from the database
      return NextResponse.json(users); // Return the fetched users as JSON}
    } else {
      const users = await prisma.user.findMany({
        relationLoadStrategy: 'join', // Load related entities (Tickets)
        where: {
          inviteId: `${inviteID}`, // Filter users by their Telegram ID
        },
      }); // Fetch all users from the database
      return NextResponse.json(users); // Return the fetched users as JSON
    }
  } else {
    const users = await prisma.user.findMany({
      relationLoadStrategy: 'join', // Load related entities (Tickets)
      include: {
        Tickets: true,
      },
      where: {
        tgID: `${tgID}`, // Filter users by their Telegram ID
      },
    }); // Fetch all users from the database
    return NextResponse.json(users); // Return the fetched users as JSON
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json(); // Extract JSON data from the request

  const user = await prisma.user.create({
    data,
  }); // Create a new user with the provided data

  return NextResponse.json(user);
}
