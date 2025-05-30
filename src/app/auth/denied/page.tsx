"use client"

import { AlertTriangle } from "lucide-react"

export default function Denied() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-4 p-8 bg-neutral-100 dark:bg-neutral-800 rounded-2xl shadow-md">
        <AlertTriangle className="text-error w-16 h-16" />
        <h1 className="text-2xl font-bold text-center text-error dark:text-error">
          Access Denied
        </h1>
        <p className="text-center text-neutral-600 dark:text-neutral-300">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  )
}
