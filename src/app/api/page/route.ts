import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Page from "@/models/page"
import { v4 as uuidv4 } from "uuid"
import type { Link, SocialMedia } from "@/types/pages"

interface PageData {
  _id: string
  id: string
  name: string
  slug: string
  userID: string
  bio?: string
  avatar?: string
  links: Link[]
  socials: SocialMedia[]
  theme: string
  createdAt: Date
  updatedAt: Date
  content?: string
  coverImage?: string
}

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const userID = searchParams.get("userID")

    if (!userID) {
      return NextResponse.json({ error: "userID is required" }, { status: 400 })
    }

    const rawPages = await Page.find({ userID }).lean()

    const sanitizedPages: PageData[] = rawPages.map((page) => ({
      _id: String(page._id),
      id: page.id ?? uuidv4(), // fallback if not set
      name: page.name ?? "",
      slug: page.slug ?? "",
      userID: page.userID ?? "",
      bio: page.bio ?? "",
      avatar: page.avatar ?? "",
      links: (page.links || []).map((link: Link) => ({
        ...link,
        id: link.id || uuidv4(),
      })),
      socials: page.socials ?? [],
      theme: page.theme ?? "default",
      createdAt: page.createdAt ?? new Date(),
      updatedAt: page.updatedAt ?? new Date(),
      content: page.content ?? "",
      coverImage: page.coverImage ?? "",
    }))

    return NextResponse.json(sanitizedPages, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch pages:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
