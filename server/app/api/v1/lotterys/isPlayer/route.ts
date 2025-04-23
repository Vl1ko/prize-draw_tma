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
    if (users.length === 0) {
      return NextResponse.json({ isPlayer: false }, { status: 200 }); // Return an error message if user is not player
    } else {
      return NextResponse.json({ isPlayer: true }, { status: 200 }); // Return a success message if a user is player
    }
  }
}

// export async function POST(req: NextRequest) {
//   const data = await req.json(); // Extract JSON data from the request

//   const user = await prisma.user.create({
//     data,
//   }); // Create a new user with the provided data

//   return NextResponse.json(user);
// }
