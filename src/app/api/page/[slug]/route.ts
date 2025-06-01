import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import { v4 as uuidv4 } from "uuid"
import Page from "@/models/page"

export async function GET(_: Request, context: { params: { slug: string } }) {
  try {
    await connectDB()
    const { slug } = context.params

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
      socialMedia: page.socials, // match this with `socialMedia` in frontend
      theme: page.theme
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error", message: error?.message || String(error) },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, context: { params: { slug: string } }) {
  try {
    console.log("🔧 [PUT] Start processing request...")

    await connectDB()
    const { slug } = context.params
    const body = await request.json()

    const { profile, links: rawLinks, socialMedia, theme } = body

    if (!profile || !theme || !Array.isArray(rawLinks) || !Array.isArray(socialMedia)) {
      return NextResponse.json(
        { error: "Missing or invalid fields in request body" },
        { status: 400 }
      )
    }

    // ✅ Generate UUIDs for links without IDs
    const links = rawLinks.map((link: any) => ({
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
  theme, // <--- use directly
  updatedAt: new Date(),
}
    console.log(updatePayload);
    

    const updatedPage = await Page.findOneAndUpdate({ slug }, updatePayload, {
      new: true,
    })

    if (!updatedPage) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 })
    }

    return NextResponse.json(updatedPage, { status: 200 })
  } catch (error: any) {
    console.error("🔥 Failed to update page:", error?.message || error)
    return NextResponse.json(
      { error: "Internal server error", message: error?.message || String(error) },
      { status: 500 }
    )
  }
}


export async function DELETE(_: Request, context: { params: { slug: string } }) {
  try {
    await connectDB();
    const { slug } = context.params;

    const deleted = await Page.findOneAndDelete({ slug });

    if (!deleted) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Page deleted successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Failed to delete page:", error);
    return NextResponse.json(
      { error: "Internal server error", message: error?.message || String(error) },
      { status: 500 }
    );
  }
}
