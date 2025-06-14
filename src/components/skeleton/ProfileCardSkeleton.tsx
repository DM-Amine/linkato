"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileCardSkeleton() {
  return (
    <Card className="border-neutral-50 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-2">
      <CardContent className="space-y-4 px-2">
        {/* Cover Image Skeleton */}
        <div className="space-y-2">
          {/* <Skeleton className="h-4 w-28 bg-neutral-300 dark:bg-neutral-700" /> */}
          <div className="w-full h-32 rounded-lg bg-neutral-300 dark:bg-neutral-700" />
        </div>

        {/* Avatar + Upload Button Skeleton */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Skeleton className="w-20 h-20 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            {/* <Skeleton className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-600 border border-neutral-400" /> */}
          </div>
        </div>

        {/* Name Input Skeleton */}
        <div className="space-y-2">
          {/* <Skeleton className="h-4 w-20 bg-neutral-300 dark:bg-neutral-700" /> */}
          <Skeleton className="h-8 w-full rounded-md bg-neutral-300 dark:bg-neutral-700" />
        </div>

        {/* Bio Input Skeleton */}
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            {/* <Skeleton className="h-4 w-20 bg-neutral-300 dark:bg-neutral-700" /> */}
            {/* <Skeleton className="h-3 w-8 bg-neutral-300 dark:bg-neutral-700" /> */}
          </div>
          <Skeleton className="h-[72px] w-full rounded-md bg-neutral-300 dark:bg-neutral-700" />
        </div>
      </CardContent>
    </Card>
  )
}
