"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function LinksManagerSkeleton() {
  return (
    <Card className="border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 overflow-hidden h-fit animate-pulse py-2">
      {/* Header with title and add button */}
      <CardHeader className="px-2 pb-1 flex items-center justify-between">
        <Skeleton className="h-5 w-20 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <Skeleton className="h-8 w-24 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </CardHeader>

      <CardContent className="space-y-3 px-2 py-1">
        {/* Form block (optional skeleton form placeholder) */}
        <div className="border border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3 space-y-2">
          <Skeleton className="h-4 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded" />
          <Skeleton className="h-4 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-16 rounded bg-neutral-300 dark:bg-neutral-700" />
            <Skeleton className="h-8 w-16 rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>
        </div>

        {/* Link row previews */}
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-800"
          >
            {/* Drag handle icon */}
            <Skeleton className="h-4 w-4 rounded bg-neutral-300 dark:bg-neutral-700" />

            {/* Title + URL */}
            <div className="flex-1 min-w-0 space-y-1">
              <Skeleton className="h-4 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded" />
              <Skeleton className="h-3 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded" />
            </div>

            {/* Action icons */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-6 rounded bg-neutral-300 dark:bg-neutral-700" />
              <Skeleton className="h-6 w-6 rounded bg-neutral-300 dark:bg-neutral-700" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
