"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { ProfileCard } from "@/components/dashboard/pages/profileCard"
import { LinksManager } from "@/components/dashboard/pages/linkManager"
import { SocialMediaManager } from "@/components/dashboard/pages/socialMediaManager"
import { ThemeCustomizer } from "@/components/dashboard/pages/themeCutomizer"
import { MobilePreview } from "@/components/dashboard/pages/mobilePreview"
import { toast } from "sonner"
import { themes } from "@/components/dashboard/themes/themes"
import { PageNavBar } from "@/components/dashboard/pages/PageNavBar"
import { DeletePageModal } from "@/components/dashboard/pages/deletePageModal"
import type { Profile, Link, SocialMedia, Theme } from "./types"

const initialProfile: Profile = {
  name: "",
  bio: "",
  image: "",
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
  const slugRegex = /^[a-z0-9_-]+$/

  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [links, setLinks] = useState<Link[]>(initialLinks)
  const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(initialSocialMedia)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0])
  const [editableSlug, setEditableSlug] = useState(originalSlug)

  const [isCheckingSlug, setIsCheckingSlug] = useState(false)
  const [slugError, setSlugError] = useState<string | null>(null)
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleAutoSave = async () => {
    if (!editableSlug.trim() || !slugAvailable) return

    const trimmedSlug = editableSlug.trim()

    const payload = {
      ...(trimmedSlug !== originalSlug && { slug: trimmedSlug }),
      profile,
      links: links.map((link, i) => ({ ...link, index: i.toString() })),
      socialMedia,
      theme: selectedTheme.id,
    }

    setIsSubmitting(true)
    setSubmitSuccess(false)

    try {
      const res = await fetch(`/api/page/${originalSlug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Failed to update page")

      setSubmitSuccess(true)

      if (trimmedSlug !== originalSlug) {
        router.push(`/dashboard/pages/${trimmedSlug}`)
      }
    } catch (err: any) {
      console.error("❌ Auto-save failed:", err)
      toast.error(err.message || "An error occurred while saving.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`/api/page/${originalSlug}`)
        if (!res.ok) throw new Error("Failed to fetch page data")

        const data = await res.json()
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
      } catch {
        setSlugError("Failed to check slug availability.")
      } finally {
        setIsCheckingSlug(false)
      }
    }, 800)

    return () => clearTimeout(handler)
  }, [editableSlug, originalSlug])

  useEffect(() => {
    if (!slugAvailable) return

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)

    autoSaveTimer.current = setTimeout(() => {
      handleAutoSave()
    }, 1500)

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [profile, links, socialMedia, selectedTheme, editableSlug, slugAvailable])

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteCancel = () => setShowDeleteModal(false)

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/page/${originalSlug}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete page")
      toast.success("Page deleted successfully.")
      router.push("/dashboard/pages")
    } catch (error: any) {
      toast.error(error.message || "An error occurred while deleting")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-full bg-neutral-400/30 dark:bg-neutral-900/70">
      <PageNavBar
        editableSlug={editableSlug}
        setEditableSlug={setEditableSlug}
        isCheckingSlug={isCheckingSlug}
        slugError={slugError}
        handleSubmit={() => {}}
        isSubmitting={isSubmitting}
        isDeleting={isDeleting}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteConfirm={handleDeleteConfirm}
        originalSlug={originalSlug}
        submitSuccess={submitSuccess}
      />

      <div className="w-full mx-auto">
        <div className="flex md:flex-row flex-col min-w-full justify-between">
          <div className="max-w-full sm:w-full mt-6 mx-3 space-y-6">
            <ProfileCard profile={profile} onProfileUpdate={setProfile} />
            <SocialMediaManager socialMedia={socialMedia} onSocialMediaUpdate={setSocialMedia} />
            <LinksManager links={links} onLinksUpdate={setLinks} />
            <ThemeCustomizer initialThemeId={selectedTheme.id} onThemeChange={setSelectedTheme} />
          </div>

          <div className="w-full hidden md:flex sm:w-10/12 md:w-8/12 lg:w-4/12 md:sticky md:top-12 md:h-fit mx-auto">
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