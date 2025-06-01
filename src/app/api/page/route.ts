import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Page from '@/models/page';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await connectDB();

    const pages = await Page.find({}).lean();

    // Ensure all links have a UUID
    const sanitizedPages = pages.map(page => ({
      ...page,
      links: (page.links || []).map(link => ({
        ...link,
        id: link.id || uuidv4(),
      })),
    }));

    return NextResponse.json(sanitizedPages, { status: 200 });
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

    const newPage = await Page.create({
      name,
      slug,
      bio: 'Welcome to my link page!',
      avatar: '/placeholder.svg?height=100&width=100',
      links: [],              // Initialize empty
      socials: [],            // Initialize empty
      theme: 'minimal-light', // Default theme
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(newPage, { status: 201 });
  } catch (error) {
    console.error('Failed to create page:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
