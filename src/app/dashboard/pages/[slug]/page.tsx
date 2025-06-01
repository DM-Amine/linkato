"use client"

import { useState, useEffect } from "react"

import { ProfileCard } from "@/components/dashboard/pages/profileCard"
import { LinksManager } from "@/components/dashboard/pages/linkManager"
import { SocialMediaManager } from "@/components/dashboard/pages/socialMediaManager"
import { ThemeCustomizer } from "@/components/dashboard/pages/themeCutomizer"
import { MobilePreview } from "@/components/dashboard/pages/mobilePreview"
import { Share } from "@/components/dashboard/pages/share"
import type { Profile, Link, SocialMedia, Theme } from "./types"
import { themes } from "@/components/dashboard/themes/themes"
import { useParams } from "next/navigation";


const initialProfile: Profile = {
  name: "Your Name",
  bio: "Welcome to my link page! Find all my important links below.",
  image: "/placeholder.svg?height=100&width=100",
}

const initialLinks: Link[] = [
  { id: "1", title: "My Website", url: "https://example.com" },
  { id: "2", title: "Instagram", url: "https://instagram.com/username" },
  { id: "3", title: "Twitter", url: "https://twitter.com/username" },
]

const initialSocialMedia: SocialMedia[] = []

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(initialSocialMedia)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(() => {
    return themes.find((theme) => theme.id === "minimal-light") ?? themes[0]
  })
  const { slug } = useParams() as { slug: string };


  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const payload = {
        profile,
        links,
        socialMedia,
        theme: selectedTheme.id,


      }


      const res = await fetch(`/api/page/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const resJson = await res.json()
      console.log("📥 Response JSON:", resJson)

      if (!res.ok) throw new Error(resJson?.error || "Failed to update page")

      setSubmitSuccess(true)
    } catch (error) {
      setSubmitError("Failed to save data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`/api/page/${slug}`)
        if (!res.ok) throw new Error("Failed to fetch page data")

        const data = await res.json()
        console.log("📥 Loaded page data:", data)

        setProfile(data.profile)
        setLinks(data.links)
        setSocialMedia(data.socialMedia)
        const matchedTheme = themes.find((t) => t.id === data.theme) ?? themes[0]
        setSelectedTheme(matchedTheme)
      } catch (err) {
        console.error("❌ Failed to load page data:", err)
      }
    }

    if (slug) fetchPageData()
  }, [slug])


  useEffect(() => {
    console.log("🎨 selectedTheme updated:", selectedTheme)
  }, [selectedTheme])


  return (
    <div className="min-h-screen bg-neutral-300 dark:bg-neutral-900/70 p-4">
      <div className="w-full mx-auto">
        <div className="flex min-w-full justify-between">
          {/* Editor Panel */}
          <div className="w-full mx-3 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-100">Dashboard</h1>
              <Share profileName={profile.name} />
            </div>

            <ProfileCard profile={profile} onProfileUpdate={setProfile} />
            <SocialMediaManager socialMedia={socialMedia} onSocialMediaUpdate={setSocialMedia} />
            <LinksManager links={links} onLinksUpdate={setLinks} />
            <ThemeCustomizer initialThemeId={selectedTheme.id} onThemeChange={setSelectedTheme} />


            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>

              {submitError && (
                <p className="text-error text-sm font-medium">{submitError}</p>
              )}

              {submitSuccess && (
                <p className="text-success text-sm font-medium">Changes saved successfully!</p>
              )}
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="w-4/12 lg:sticky lg:top-0 lg:h-fit">
            <MobilePreview
              profile={profile}
              links={links}
              socialMedia={socialMedia}
              theme={selectedTheme} // ✅ This is required!
            />
          </div>
        </div>
      </div>
    </div>
  )
}
