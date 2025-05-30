import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import User from '@/models/user';

import connectDB from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';


export async function POST(req: NextRequest) {


  try {
    await connectDB();
  
  } catch (dbError: unknown) {
    console.error('Database connection failed:', dbError);
    return NextResponse.json(
      {
        error: 'Database connection failed',
        detail: dbError instanceof Error ? dbError.stack || dbError.message : 'Unknown error',
      },
      { status: 500 }
    );
  }

  try {
    const bodyText = await req.text();
   

    let body;
    try {
      body = JSON.parse(bodyText);
    } catch (parseError) {
      console.error('Failed to parse JSON body:', parseError);
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const {
      full_name,
      email,
      password,
      role = 'user',
      profileImage = '',
      subscription = { plan: 'free', status: 'inactive' },
      emailVerified = false,
      referralCode,
      referredBy,
    } = body;

    if (!full_name || !email || !password) {
     
      return NextResponse.json(
        {
          error: 'Missing required fields',
          missing: {
            full_name: !full_name,
            email: !email,
            password: !password,
          },
        },
        { status: 400 }
      );
    }

    
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
  
    } catch (hashError: unknown) {
      console.error('Password hashing failed:', hashError);
      return NextResponse.json(
        {
          error: 'Failed to hash password',
          detail: hashError instanceof Error ? hashError.stack || hashError.message : 'Unknown error',
        },
        { status: 500 }
      );
    }

    const userID = uuidv4();
  

    let user;
    try {
      user = await User.create({
        userID,
        full_name,
        email,
        password: hashedPassword,
        role,
        profileImage,
        subscription,
        emailVerified,
        provider: 'credentials',
        referralCode,
        referredBy,
      });
   
    } catch (userError: unknown) {
      console.error('User creation failed:', userError);
      return NextResponse.json(
        {
          error: 'Failed to create user',
          detail: userError instanceof Error ? userError.stack || userError.message : 'Unknown error',
        },
        { status: 500 }
      );
    }



    
    return NextResponse.json(
      {
        message: 'User created successfully',
        user,
     
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error('Unexpected error in POST /users:', err);
    return NextResponse.json(
      {
        error: 'Unexpected error',
        detail: err instanceof Error ? err.stack || err.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


export async function GET() {  // Removed 'req' parameter as it's not used
  try {
    await connectDB();
  } catch (dbError: unknown) {
    console.error('Database connection failed:', dbError);

    const errorMessage = dbError instanceof Error ? dbError.message : 'An unknown error occurred';

    return NextResponse.json({ error: 'Database connection failed', detail: errorMessage }, { status: 500 });
  }

  try {
    const users = await User.find({});

    if (users.length === 0) {
      return NextResponse.json({ message: 'No users found' }, { status: 404 });
    }

    return NextResponse.json({ users }, { status: 200 });
  } catch (err: unknown) {
    console.error('Failed to fetch users:', err);

    const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';

    return NextResponse.json({ error: 'Failed to fetch users', detail: errorMessage }, { status: 500 });
  }
}
