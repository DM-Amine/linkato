import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/contact";
import { Types } from "mongoose";

// GET
export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectDB();

  const { params } = context;
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const message = await Contact.findById(id);
  if (!message) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 });
  }

  return NextResponse.json({ message }, { status: 200 });
}

// PUT
export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectDB();

  const { params } = context;
  const { id } = await params;
  const { status } = await req.json(); // <-- get status instead of read

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const message = await Contact.findByIdAndUpdate(
    id,
    { status }, // <-- update status not read
    { new: true }
  );

  if (!message) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 });
  }

  return NextResponse.json({ message: "Message updated successfully." }, { status: 200 });
}

// DELETE
export async function DELETE(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await connectDB();

  const { params } = context;
  const { id } = await params;

  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid ID." }, { status: 400 });
  }

  const message = await Contact.findByIdAndDelete(id);
  if (!message) {
    return NextResponse.json({ error: "Message not found." }, { status: 404 });
  }

  return NextResponse.json({ message: "Message deleted successfully." }, { status: 200 });
}
