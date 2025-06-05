import { NextRequest, NextResponse } from "next/server"
import { upload } from "@vercel/blob"

export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming form data with the file
    const formData = await req.formData()
    const file = formData.get("file") as Blob | null

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Use the `upload` method to store the file in Vercel Blob storage
    const url = await upload(file, {
      access: "public" // or "private" depending on your need
    })

    return NextResponse.json({ url }, { status: 200 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
