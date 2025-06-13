import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Page from "@/models/page"

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const slug = searchParams.get("slug")

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 })
    }

    const exists = await Page.exists({ slug })

    return NextResponse.json({ exists: Boolean(exists) }, { status: 200 })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    )
  }
}
