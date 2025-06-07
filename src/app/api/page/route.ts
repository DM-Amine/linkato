// /api/page/route.ts (GET)

import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Page from "@/models/page";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userID = searchParams.get("userID");

    if (!userID) {
      return NextResponse.json({ error: "userID is required" }, { status: 400 });
    }

    const pages = await Page.find({ userID }).lean();

    // Ensure all links have a UUID
    const sanitizedPages = pages.map((page) => ({
      ...page,
      links: (page.links || []).map((link) => ({
        ...link,
        id: link.id || uuidv4(),
      })),
    }));

    return NextResponse.json(sanitizedPages, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch pages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, slug, userID } = body;

    if (!name || !slug || !userID) {
      return NextResponse.json(
        { error: 'Name, slug, and userID are required' },
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
      id: uuidv4(), // ✅ Add a custom UUID field
      name,
      slug,
      userID,
      bio: 'Welcome to my link page!',
      avatar: '/placeholder.svg?height=100&width=100',
      links: [],
      socials: [],
      theme: 'minimal-dark',
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

