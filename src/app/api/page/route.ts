import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Page from '@/models/page';

export async function GET() {
  try {
    await connectDB();

    const pages = await Page.find({}).lean();

    return NextResponse.json(pages, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch pages:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, slug } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existingPage = await Page.findOne({ slug });
    if (existingPage) {
      return NextResponse.json(
        { error: 'Slug already exists. Please choose another.' },
        { status: 409 }
      );
    }

    const newPage = await Page.create({ name, slug });

    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    console.error('Failed to create page:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
