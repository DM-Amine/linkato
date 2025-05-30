import { NextResponse } from 'next/server';
import connectDB from "@/lib/mongodb";
import Contact from '@/models/contact';

export async function GET() {
    try {
        await connectDB();
        console.log('Fetching messages from database...');
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        console.log('Found messages:', contacts.length);
        return NextResponse.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return NextResponse.json(
            { error: 'Failed to fetch contacts' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
      await connectDB();
      const body = await request.json();
  
      // Ensure email is lowercase server-side
      const contactData = {
        ...body,
        email: body.email?.toLowerCase() || '',
      };
  
      const contact = await Contact.create(contactData);
      return NextResponse.json(contact, { status: 201 });
    } catch (error) {
      console.error('Error creating contact:', error);
      return NextResponse.json(
        { error: 'Failed to create contact' },
        { status: 500 }
      );
    }
  }
  