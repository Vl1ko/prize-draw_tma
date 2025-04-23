import { prisma } from '@/prisma/prisma-client';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const query = String(req.nextUrl.searchParams.get('id') || ''); // Get the query parameter from the request URL

  if (query == '') {
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 }); // Return the fetched users as JSON
  } else {
    const users = await prisma.lotery.findMany({
      where: {
        id: Number(query),
      },
    });
    return NextResponse.json(users); // Return the fetched users as JSON
  }
}

// export async function POST(req: NextRequest) {
//   const data = await req.json(); // Extract JSON data from the request

//   const user = await prisma.user.create({
//     data,
//   }); // Create a new user with the provided data

//   return NextResponse.json(user);
// }
