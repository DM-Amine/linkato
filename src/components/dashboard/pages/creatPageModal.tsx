"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();
  

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
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  if (!session?.user?.userID) {
    setError("You must be logged in to create a page.");
    return;
  }

  setIsSubmitting(true);
  setError(null);

  try {
    const response = await fetch("/api/page", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: pageName,
        slug,
        userID: session.user.userID, // ✅ Include userID from session
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error || "Failed to create page. Please try again.");
      setIsSubmitting(false);
      return;
    }

    router.push(`/dashboard/pages/${slug}`);
    onClose();
  } catch (err) {
    setError("Failed to create page. Please try again.");
    setIsSubmitting(false);
  }
};


  const handleClose = () => {
    setPageName("")
    setSlug("")
    setIsSlugEdited(false)
    setError(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-300 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-1">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold ">Create New Page</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="page-name" className="text-neutral-700 dark:text-neutral-300">
              Page Name
            </Label>
            <Input
              id="page-name"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="My Awesome Page"
              className="border-neutral-500 focus:ring-primary"
              autoFocus
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="page-slug" className="text-neutral-700 dark:text-neutral-300">
                URL Slug
              </Label>
              
            </div>
           <div className="relative">
  <span className="absolute inset-y-0 left-3 flex items-center text-sm text-neutral-600 dark:text-neutral-400 select-none">
    linkato.io/
  </span>
  <Input
    id="page-slug"
    value={slug}
    onChange={handleSlugChange}
    placeholder="my-awesome-page"
    className="pl-[74px] border-neutral-500 focus:ring-primary"
    disabled={isSubmitting}
  />
</div>

            <p className="text-xs   text-neutral-700 dark:text-neutral-300">
              This will be the URL of your page. Only use lowercase letters, numbers, and hyphens.
            </p>
      
          </div>

          {error && (
            <div className="bg-error/10 border border-error/20 text-error rounded-md p-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <DialogFooter className="py-1.5">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
            
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="border border-white"  disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Page"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
