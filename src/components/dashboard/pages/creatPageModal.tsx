"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

interface CreatePageModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreatePageModal({ isOpen, onClose }: CreatePageModalProps) {
  const router = useRouter()
  const [pageName, setPageName] = useState("")
  const [slug, setSlug] = useState("")
  const [isSlugEdited, setIsSlugEdited] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isSlugEdited && pageName) {
      setSlug(slugify(pageName))
    }
  }, [pageName, isSlugEdited])

  const slugify = (text: string): string => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugEdited(true)
    setSlug(e.target.value)
  }

  const validateForm = (): boolean => {
    if (!pageName.trim()) {
      setError("Page name is required")
      return false
    }

    if (!slug.trim()) {
      setError("Slug is required")
      return false
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      setError("Slug can only contain lowercase letters, numbers, and hyphens")
      return false
    }

    setError(null)
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: pageName, slug }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Failed to create page. Please try again.")
        setIsSubmitting(false)
        return
      }

      // Success: navigate to the new page URL
      router.push(`/dashboard/pages/${slug}`)
      onClose()
    } catch (err) {
      setError("Failed to create page. Please try again.")
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setPageName("")
    setSlug("")
    setIsSlugEdited(false)
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-neutral-800">Create New Page</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="page-name" className="text-neutral-700">
              Page Name
            </Label>
            <Input
              id="page-name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="My Awesome Page"
              className="border-neutral-300 focus:border-primary"
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="page-slug" className="text-neutral-700">
                URL Slug
              </Label>
              <span className="text-xs text-neutral-500">yoursite.com/</span>
            </div>
            <Input
              id="page-slug"
              value={slug}
              onChange={handleSlugChange}
              placeholder="my-awesome-page"
              className="border-neutral-300 focus:border-primary"
              disabled={isSubmitting}
            />
            <p className="text-xs text-neutral-500">
              This will be the URL of your page. Only use lowercase letters, numbers, and hyphens.
            </p>
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error rounded-md p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="border-neutral-300 text-neutral-700"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-white" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Page"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
