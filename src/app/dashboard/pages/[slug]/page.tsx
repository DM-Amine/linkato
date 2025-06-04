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
import { Download,Loader2, Pencil } from "lucide-react"

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
  const [isCheckingSlug, setIsCheckingSlug] = useState(false)
const [slugError, setSlugError] = useState<string | null>(null)
const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null)
const slugRegex = /^[a-z0-9_-]+$/

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
  setSubmitError(null)
  setSubmitSuccess(false)

  const trimmedSlug = editableSlug.trim()

  // Check if the slug is empty
  if (!trimmedSlug) {
    setSlugError("Slug cannot be empty.")
    return
  }

  // Check if slug format is invalid
  if (!slugRegex.test(trimmedSlug)) {
    setSlugError("Use lowercase letters, numbers, '-' or '_'. No spaces allowed.")
    return
  }

  // Check if slug is not available (e.g. taken or failed check)
  if (slugAvailable === false) {
    setSlugError("Slug is already taken.")
    return
  }

  setIsSubmitting(true)

  try {
    const payload = {
      ...(trimmedSlug !== originalSlug && { slug: trimmedSlug }),
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

    if (!res.ok) throw new Error(resJson?.error || "Failed to update page")

    setSubmitSuccess(true)

    if (trimmedSlug !== originalSlug) {
      router.push(`/dashboard/pages/${trimmedSlug}`)
    }
  } catch (error) {
    setSubmitError("Failed to save data. Please try again.")
  } finally {
    setIsSubmitting(false)
  }
}


  useEffect(() => {
  if (!editableSlug || editableSlug === originalSlug) {
    setSlugError(null)
    setSlugAvailable(true)
    return
  }

  if (!slugRegex.test(editableSlug)) {
    setSlugError("Use lowercase letters, numbers, '-' or '_'. No spaces allowed.")
    setSlugAvailable(false)
    return
  }

  const handler = setTimeout(async () => {
    setIsCheckingSlug(true)
    setSlugError(null)

    try {
      const res = await fetch(`/api/page/check-slug?slug=${editableSlug}`)

      const data = await res.json()

      if (data.exists) {
        setSlugError("Slug is already taken.")
        setSlugAvailable(false)
      } else {
        setSlugAvailable(true)
      }
    } catch (err) {
      setSlugError("Failed to check slug availability.")
    } finally {
      setIsCheckingSlug(false)
    }
  }, 800)

  return () => clearTimeout(handler)
}, [editableSlug])


  return (
    <div className="min-h-screen bg-neutral-400/30 dark:bg-neutral-900/70 p-4">
      <div className="w-full mx-auto">
        <div className="flex min-w-full justify-between">
          {/* Editor Panel */}
          <div className="w-full mx-3 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col space-y-1">
  <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">Page Slug:</label>
  <div className="flex items-center bg-primary-light/60 border-2 border-neutral-50 rounded-lg px-2 py-1 w-fit">
    <input
      type="text"
      value={editableSlug}
      onChange={(e) => {
        const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "")
        setEditableSlug(newSlug)
      }}
      className="bg-transparent outline-none text-sm font-semibold text-neutral-700 dark:text-neutral-200 w-auto min-w-[6rem] max-w-[12rem] truncate"
    />
    {isCheckingSlug ? (
      <Loader2 className="animate-spin w-4 h-4 text-neutral-600 ml-1" />
    ) : (
      <Pencil className="w-4 h-4 text-neutral-600 ml-1" />
    )}
  </div>
  {slugError && <p className="text-sm text-error">{slugError}</p>}
  {/* {slugAvailable && <p className="text-sm text-success">Slug is available</p>} */}
</div>

              <div className="mt-6 flex items-center gap-4">
               <Button
  onClick={handleSubmit}
  variant="default"
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
