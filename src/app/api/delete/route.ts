import { del } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { url } = await req.json()

  if (!url) {
    return NextResponse.json({ error: "No URL provided" }, { status: 400 })
  }

  try {
    await del(url)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.log("Delete error:", err);
    
    return NextResponse.json({ error: "Failed to delete blob" }, { status: 500 })
  }
}
