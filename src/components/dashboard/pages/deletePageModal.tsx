// components/DeletePageModal.tsx
"use client"

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface DeletePageModalProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  pageName: string
}

export function DeletePageModal({ open, onConfirm, onCancel, pageName }: DeletePageModalProps) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px] bg-neutral-300 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-1">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Delete Page</DialogTitle>
        </DialogHeader>

        <div className="bg-error/10 border border-error/20 text-error rounded-md p-3 flex items-start gap-2 ">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="text-sm">
            Are you sure you want to delete <strong>{pageName}</strong>? This action cannot be undone.
          </p>
        </div>

        <DialogFooter className="py-1.5">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" className="bg-error" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
