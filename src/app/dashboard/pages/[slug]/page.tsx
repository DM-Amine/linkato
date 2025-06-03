"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { ProfileCard } from "@/components/dashboard/pages/profileCard"
import { LinksManager } from "@/components/dashboard/pages/linkManager"
import { SocialMediaManager } from "@/components/dashboard/pages/socialMediaManager"
import { ThemeCustomizer } from "@/components/dashboard/pages/themeCutomizer"
import { MobilePreview } from "@/components/dashboard/pages/mobilePreview"
import { Button } from "@/components/ui/button"
import { Share } from "@/components/dashboard/pages/share"
import type { Profile, Link, SocialMedia, Theme } from "./types"
import { themes } from "@/components/dashboard/themes/themes"
import { Download, Pencil } from "lucide-react"

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
  const router = useRouter()
  const params = useParams() as { slug: string }
  const originalSlug = params.slug

  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(initialSocialMedia)
  const [editableSlug, setEditableSlug] = useState(originalSlug)

  const [selectedTheme, setSelectedTheme] = useState<Theme>(() => {
    return themes.find((theme) => theme.id === "minimal-light") ?? themes[0]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Fetch page data on load or slug change
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`/api/page/${originalSlug}`)
        if (!res.ok) throw new Error("Failed to fetch page data")

        const data = await res.json()
        console.log("📥 Loaded page data:", data)

        setProfile(data.profile)
        setLinks(data.links)
        setSocialMedia(data.socialMedia)
        const matchedTheme = themes.find((t) => t.id === data.theme) ?? themes[0]
        setSelectedTheme(matchedTheme)
        setEditableSlug(originalSlug)
      } catch (err) {
        console.error("❌ Failed to load page data:", err)
      }
    }

    if (originalSlug) fetchPageData()
  }, [originalSlug])

  // Clear messages on slug change
  useEffect(() => {
    setSubmitError(null)
    setSubmitSuccess(false)
  }, [editableSlug])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    try {
      const payload = {
        slug: editableSlug, // the potentially updated slug
        profile,
        links: links.map((link, i) => ({
          ...link,
          index: i.toString(),
        })),
        socialMedia,
        theme: selectedTheme.id,
      }

      const res = await fetch(`/api/page/${originalSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const resJson = await res.json()
      console.log("📥 Response JSON:", resJson)

      if (!res.ok) throw new Error(resJson?.error || "Failed to update page")

      setSubmitSuccess(true)

      // If slug changed, update URL and state
      if (editableSlug !== originalSlug) {
        router.push(`/dashboard/pages/${editableSlug}`) // adjust path to your actual route
      }
    } catch (error) {
      setSubmitError("Failed to save data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-400/30 dark:bg-neutral-900/70 p-4">
      <div className="w-full mx-auto">
        <div className="flex min-w-full justify-between">
          {/* Editor Panel */}
          <div className="w-full mx-3 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-lg flex items-center font-bold text-neutral-800 dark:text-neutral-100">
                Page Slug:
                <div className="flex items-center text-sm font-semibold text-neutral-700 bg-primary-light/60 border-2 border-neutral-50 rounded-lg px-1 py-0.5 ml-2">
                  <input
                    type="text"
                    value={editableSlug}
                    onChange={(e) => setEditableSlug(e.target.value)}
                    className="bg-transparent outline-none text-sm font-semibold text-neutral-700 dark:text-neutral-200 w-auto min-w-[4rem] max-w-[12rem] truncate"
                  />
                  <Pencil className="w-4 h-4 p-px bg-primary text-white rounded m-1" />
                </div>
              </h1>
              <div className="mt-6 flex items-center gap-4">
                <Button
                  onClick={handleSubmit}
                  variant={"default"}
                  className="border border-neutral-50 dark:border-d-primary-light shadow-sm"
                  disabled={isSubmitting}
                >
                  <Download className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : "Save"}
                </Button>

                {submitError && (
                  <p className="text-error text-sm font-medium">{submitError}</p>
                )}

                {submitSuccess && (
                  <p className="text-success text-sm font-medium">Changes saved successfully!</p>
                )}
              </div>
            </div>

            {originalSlug && <Share slug={originalSlug} />}
            <ProfileCard profile={profile} onProfileUpdate={setProfile} />
            <SocialMediaManager socialMedia={socialMedia} onSocialMediaUpdate={setSocialMedia} />
            <LinksManager links={links} onLinksUpdate={setLinks} />
            <ThemeCustomizer initialThemeId={selectedTheme.id} onThemeChange={setSelectedTheme} />
          </div>

          {/* Mobile Preview */}
          <div className="w-4/12 lg:sticky lg:top-0 lg:h-fit">
            <MobilePreview
              profile={profile}
              links={links}
              socialMedia={socialMedia}
              theme={selectedTheme}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
