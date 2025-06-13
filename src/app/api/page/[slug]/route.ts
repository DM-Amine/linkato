import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { v4 as uuidv4 } from "uuid"
import Page from "@/models/page"
import type { Profile, Link, SocialMedia, Theme } from "@/types/pages"

interface Params {
  params: Promise<{ slug: string }>
}

interface UpdatePageRequest {
  profile: Profile
  links: Link[]
  socialMedia: SocialMedia[]
  theme: Theme
  slug?: string
  content?: string
}

export async function GET(_: Request, context: Params) {
  try {
    await connectDB()
    const { slug } = await context.params

    const page = await Page.findOne({ slug })
    if (!page) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({
      profile: {
        name: page.name,
        bio: page.bio,
        image: page.avatar,
        coverImage: page.coverImage,
      },
      links: page.links,
      socialMedia: page.socials,
      theme: page.theme,
      content: page.content || "",
    })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, context: Params) {
  try {
    console.log("🔧 [PUT] Start processing request...")

    await connectDB()
    const { slug } = await context.params
    const body: UpdatePageRequest = await request.json()

    const { profile, links: rawLinks, socialMedia, theme, slug: newSlug, content } = body

    if (!profile || !theme || !Array.isArray(rawLinks) || !Array.isArray(socialMedia)) {
      return NextResponse.json(
        { error: "Missing or invalid fields in request body" },
        { status: 400 }
      )
    }

    const slugChanged = typeof newSlug === "string" && newSlug.trim() !== "" && newSlug !== slug

    if (slugChanged) {
      const slugExists = await Page.findOne({ slug: newSlug })
      if (slugExists) {
        return NextResponse.json({ error: "Slug already in use" }, { status: 400 })
      }
    }

    const links: Link[] = rawLinks.map(link => ({
      ...link,
      id: link.id || uuidv4(),
    }))

    const updatePayload = {
      name: profile.name,
      bio: profile.bio,
      avatar: profile.image,
      coverImage: profile.coverImage,
      links,
      socials: socialMedia,
      theme,
      ...(slugChanged && { slug: newSlug }),
      updatedAt: new Date(),
      ...(typeof content === "string" && { content: content.trim() }),
    }

    console.log("🔄 Update Payload:", updatePayload)

    const updatedPage = await Page.findOneAndUpdate({ slug }, updatePayload, { new: true })

    if (!updatedPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPage, { status: 200 })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error("🔥 Failed to update page:", err.message)
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    )
  }
}

export async function DELETE(_: Request, context: Params) {
  try {
    await connectDB()
    const { slug } = await context.params

    const deleted = await Page.findOneAndDelete({ slug })

    if (!deleted) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Page deleted successfully" }, { status: 200 })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error("❌ Failed to delete page:", err.message)
    return NextResponse.json(
      { error: "Internal server error", message: err.message },
      { status: 500 }
    )
  }
}
