"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"

import { ProfileCard } from "@/components/dashboard/pages/profileCard"
import { LinksManager } from "@/components/dashboard/pages/linkManager"
import { SocialMediaManager } from "@/components/dashboard/pages/socialMediaManager"
import { ThemeCustomizer } from "@/components/dashboard/pages/themeCutomizer"
import { MobilePreview } from "@/components/dashboard/pages/mobilePreview"
import { PageNavBar } from "@/components/dashboard/pages/PageNavBar"
import { themes } from "@/components/dashboard/themes/themes"
import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

import type { Profile, Link, SocialMedia, Theme } from "./types"

const initialProfile: Profile = {
  name: "",
  bio: "",
  image: "",
}

const initialLinks: Link[] = []
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
  const [pageContent, setPageContent] = useState<string>("")

  const [isPageLoaded, setIsPageLoaded] = useState(false)
  const [isCheckingSlug, setIsCheckingSlug] = useState(false)
  const [slugError, setSlugError] = useState<string | null>(null)
  const [slugAvailable, setSlugAvailable] = useState<boolean>(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastSavedState = useRef<string>("")

  // Load page data
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const res = await fetch(`/api/page/${originalSlug}`)
        if (!res.ok) throw new Error("Failed to fetch page data")

        const data = await res.json()
        setProfile(data.profile)
        setLinks(data.links)
        setSocialMedia(data.socialMedia)
        setSelectedTheme(themes.find(t => t.id === data.theme) ?? themes[0])
        setEditableSlug(originalSlug)
        setPageContent(data.content || "")
        setSlugAvailable(true)
        setIsPageLoaded(true)

        lastSavedState.current = JSON.stringify({
          profile: data.profile,
          links: data.links,
          socialMedia: data.socialMedia,
          theme: data.theme,
          slug: originalSlug,
          content: data.content || "",
        })
      } catch (err) {
        console.error("❌ Failed to load page data:", err)
      }
    }

    if (originalSlug) fetchPageData()
  }, [originalSlug])

  // Slug availability check
  useEffect(() => {
    if (!editableSlug || editableSlug === originalSlug) {
      setSlugError(null)
      setSlugAvailable(true)
      return
    }

    if (!slugRegex.test(editableSlug)) {
      setSlugError("Use lowercase letters, numbers, '-' or '_'. No spaces.")
      setSlugAvailable(false)
      return
    }

    const handler = setTimeout(async () => {
      setIsCheckingSlug(true)
      try {
        const res = await fetch(`/api/page/check-slug?slug=${editableSlug}`)
        const { exists } = await res.json()
        setSlugAvailable(!exists)
        setSlugError(exists ? "Slug is already taken." : null)
      } catch {
        setSlugError("Failed to check slug availability.")
        setSlugAvailable(false)
      } finally {
        setIsCheckingSlug(false)
      }
    }, 800)

    return () => clearTimeout(handler)
  }, [editableSlug, originalSlug])

  // Auto-save
  useEffect(() => {
    if (!isPageLoaded || !slugAvailable) return

    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)

    autoSaveTimer.current = setTimeout(() => {
      const currentState = JSON.stringify({
        profile,
        links,
        socialMedia,
        theme: selectedTheme.id,
        slug: editableSlug.trim(),
        content: pageContent,
      })

      if (currentState !== lastSavedState.current) {
        handleAutoSave(currentState)
      }
    }, 1500)

    return () => {
      if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    }
  }, [
    profile,
    links,
    socialMedia,
    selectedTheme,
    editableSlug,
    slugAvailable,
    isPageLoaded,
    pageContent,
  ])

  const handleAutoSave = async (nextStateStr: string) => {
    if (!editableSlug.trim() || !slugAvailable) return

    const trimmedSlug = editableSlug.trim()

    const payload = {
      ...(trimmedSlug !== originalSlug && { slug: trimmedSlug }),
      profile,
      links: links.map((link, i) => ({ ...link, index: i.toString() })),
      socialMedia,
      theme: selectedTheme.id,
      content: pageContent,
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

      lastSavedState.current = nextStateStr
      setSubmitSuccess(true)

      if (trimmedSlug !== originalSlug && `/dashboard/pages/${trimmedSlug}` !== window.location.pathname) {
        router.push(`/dashboard/pages/${trimmedSlug}`)
      }
    } catch (err: any) {
      console.error("❌ Auto-save failed:", err)
      toast.error(err.message || "An error occurred while saving.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteCancel = () => setShowDeleteModal(false)
  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      const res = await fetch(`/api/page/${originalSlug}`, {
        method: "DELETE",
      })
      if (!res.ok) throw new Error("Failed to delete page")

      toast.success("Page deleted successfully.")
      router.push("/dashboard/pages")
    } catch (err: any) {
      toast.error(err.message || "An error occurred while deleting.")
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

            <div className="border-neutral-50 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 pt-2 shadow-xs rounded-xl">
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">Content</h2>
              <div className="tiptap rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
             <SimpleEditor
  key={isPageLoaded ? "editor-loaded" : "editor-loading"} // or key={pageContent}
  content={pageContent}
  onContentChange={setPageContent}
/>

              </div>
            </div>

            <SocialMediaManager socialMedia={socialMedia} onSocialMediaUpdate={setSocialMedia} />
            <LinksManager links={links} onLinksUpdate={setLinks} />
            <ThemeCustomizer
              initialThemeId={selectedTheme.id}
              onThemeChange={setSelectedTheme}
            />
          </div>

          <div className="w-full hidden md:flex sm:w-10/12 md:w-8/12 lg:w-4/12 md:sticky md:top-12 md:h-fit mx-auto">
            <MobilePreview
  profile={profile}
  links={links}
  socialMedia={socialMedia}
  theme={selectedTheme}
  content={pageContent}
/>

          </div>
        </div>
      </div>
    </div>
  )
}
