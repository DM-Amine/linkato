"use client"
import { useEffect, useState } from "react"


import { Check,Loader2, Pencil, Trash2, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DeletePageModal } from "@/components/dashboard/pages/deletePageModal"
import { Separator } from "@/components/ui/separator"
import { Share } from "@/components/dashboard/pages/share"

interface PageNavBarProps {
    editableSlug: string
    setEditableSlug: (slug: string) => void
    isCheckingSlug: boolean
    slugError: string | null
    handleSubmit: () => void
    isSubmitting: boolean
    isDeleting: boolean
    setShowDeleteModal: (show: boolean) => void
    showDeleteModal: boolean
    handleDeleteCancel: () => void
    handleDeleteConfirm: () => void
    originalSlug: string
    submitSuccess: boolean
}

export function PageNavBar({
  editableSlug,
  setEditableSlug,
  isCheckingSlug,
  slugError,
 
  isSubmitting,
  isDeleting,
  setShowDeleteModal,
  showDeleteModal,
  handleDeleteCancel,
  handleDeleteConfirm,
  originalSlug,
  submitSuccess, 
}: PageNavBarProps) {

     const [justSaved, setJustSaved] = useState(false)

  useEffect(() => {
    if (submitSuccess) {
      setJustSaved(true)
      const timer = setTimeout(() => setJustSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [submitSuccess])
    return (
        <div className="border-b border-neutral-400 dark:border-neutral-700 sticky top-0 z-10 max-w-full flex sm:flex-row flex-col sm:items-center justify-between bg-neutral-200 dark:bg-neutral-900 px-2 py-1">
            <div className="flex items-center gap-2">
                {/* <label className="text-sm whitespace-nowrap font-semibold text-neutral-700 dark:text-neutral-300">
                    Page Slug:
                </label> */}
                {originalSlug && <Share slug={originalSlug} />}
            </div>

            <div className="flex items-center my-1 sm:my-0 gap-2">
                <div className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-200 min-w-[70px] h-8">
   {isSubmitting ? (
    <span className="flex items-center gap-1">
        <Loader2 className="w-4 h-4 animate-spin text-neutral-500" />
        Saving...
    </span>
) : justSaved ? (
    <span className="flex items-center gap-1 text-success/80">
        <Check className="w-4 h-4" />
        Saved
    </span>
) : null}

</div>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="!p-3 h-5 w-5 border border-neutral-500 hover:border-neutral-400 !ring-0 hover:bg-neutral-300 ">
                            <Settings className="w-5 h-5 shrink-0  text-neutral-700 dark:text-neutral-300" />
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="sm:mr-4 px-2 py-1 space-y-4 w-64 bg-neutral-200  dark:bg-neutral-900  border border-neutral-400 dark:border-neutral-700">
                        <div>
                            <label className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                                Edit Slug
                            </label>
                            <div className="flex items-center mt-1 bg-primary-light/60 border-2 border-neutral-50 rounded-lg px-2 py-1">
                                <input
                                    type="text"
                                    value={editableSlug}
                                    onChange={(e) => {
                                        const newSlug = e.target.value
                                            .toLowerCase()
                                            .replace(/[^a-z0-9_-]/g, "")
                                        setEditableSlug(newSlug)
                                    }}
                                    className="bg-transparent outline-none text-sm font-semibold text-neutral-700 dark:text-neutral-200 w-full"
                                />
                                {isCheckingSlug ? (
                                    <Loader2 className="animate-spin w-4 h-4 text-neutral-600 ml-1" />
                                ) : (
                                    <Pencil className="w-4 h-4 text-neutral-600 ml-1" />
                                )}
                            </div>
                            {slugError && (
                                <p className="text-xs text-error mt-1">{slugError}</p>
                            )}
                        </div>
                        <Separator className="mx-auto w-full bg-neutral-400/50 my-1 h-[2px]" />
                        <Button
                            variant="destructive"
                            className="w-full justify-start border-none text-error hover:bg-error/90 hover:text-neutral-50 border"
                            onClick={() => setShowDeleteModal(true)}
                            disabled={isDeleting}
                        >
                            <Trash2 className="w-4 h-4" />
                            Delete Page
                        </Button>

                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <DeletePageModal
                open={showDeleteModal}
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
                pageName={editableSlug}
            />
        </div>
    )
}
