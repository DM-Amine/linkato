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
import { DeletePageModal } from "@/components/dashboard/pages/deletePageModal"
import { PageNavBar } from "@/components/dashboard/pages/PageNavBar"
import type { Profile, Link, SocialMedia, Theme } from "./types"
import { toast } from "sonner";
import { themes } from "@/components/dashboard/themes/themes"
import { Download, Loader2, Pencil, Trash2 } from "lucide-react"

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

    if (!trimmedSlug) {
      setSlugError("Slug cannot be empty.")
      toast.error("Slug cannot be empty.")
      return
    }

    if (!slugRegex.test(trimmedSlug)) {
      setSlugError("Use lowercase letters, numbers, '-' or '_'. No spaces allowed.")
      toast.error("Use lowercase letters, numbers, '-' or '_'. No spaces allowed.")
      return
    }

    if (slugAvailable === false) {
      setSlugError("Slug is already taken.")
      toast.error("Slug is already taken.")
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
      toast.success("Changes saved successfully!")

      if (trimmedSlug !== originalSlug) {
        router.push(`/dashboard/pages/${trimmedSlug}`)
      }
    } catch (error) {
      setSubmitError("Failed to save data. Please try again.")
      toast.error("Failed to save data. Please try again.")
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


  // delete
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeleteError(null);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`/api/page/${originalSlug}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to delete page");
      }
      toast.success("Page deleted successfully.")
      router.push("/dashboard/pages");
    } catch (error: any) {
      setDeleteError(error.message || "An error occurred while deleting");
      toast.error(error.message || "An error occurred while deleting")
    } finally {
      setIsDeleting(false);
    }
  };




  return (
    <div className="min-h-full bg-neutral-400/30 dark:bg-neutral-900/70 ">
      <PageNavBar
        editableSlug={editableSlug}
        setEditableSlug={setEditableSlug}
        isCheckingSlug={isCheckingSlug}
        slugError={slugError}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        isDeleting={isDeleting}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteConfirm={handleDeleteConfirm}
        originalSlug={originalSlug}
      />

      <div className="w-full mx-auto">
        <div className="flex md:flex-row flex-col min-w-full justify-between">
          {/* Editor Panel */}
          <div className="max-w-full sm:w-full mt-6 mx-3 space-y-6">
            <ProfileCard profile={profile} onProfileUpdate={setProfile} />
            <SocialMediaManager socialMedia={socialMedia} onSocialMediaUpdate={setSocialMedia} />
            <LinksManager links={links} onLinksUpdate={setLinks} />
            <ThemeCustomizer initialThemeId={selectedTheme.id} onThemeChange={setSelectedTheme} />
          </div>

          {/* Mobile Preview */}
<div className="w-full hidden md:flex  sm:w-10/12 md:w-8/12 lg:w-4/12 md:sticky md:top-12 md:h-fit mx-auto">
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
