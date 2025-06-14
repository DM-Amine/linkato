"use client"

import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ThemeCustomizerSkeleton() {
  return (
    <Card className="border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 animate-pulse py-2">
      <CardHeader className="px-2 pb-1">
        <Skeleton className="h-5 w-24 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </CardHeader>

      <CardContent className="px-2 space-y-4">
       

        {/* Theme preview cards skeleton grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              className="h-32 w-full bg-neutral-300 dark:bg-neutral-700 rounded-lg"
            />
          ))}
        </div>

        
      </CardContent>
    </Card>
  )
}
