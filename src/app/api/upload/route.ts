// app/api/upload/route.ts
import { put } from "@vercel/blob"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const form = await req.formData()
  const file = form.get("file") as File
  const type = form.get("type") as "avatar" | "cover"

  if (!file || !type) {
    return NextResponse.json({ error: "Missing file or type" }, { status: 400 })
  }

  const folder = type === "avatar" ? "pages/avatars" : "pages/cover_images"
  const timestamp = Date.now()
  const cleanFileName = file.name.replace(/\s+/g, "_")
  const uniqueName = `${folder}/${timestamp}-${cleanFileName}`

  const blob = await put(uniqueName, file, { access: "public" })

  return NextResponse.json({ url: blob.url })
}
