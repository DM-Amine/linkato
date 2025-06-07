import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export function PageCardSkeleton() {
  return (
    <Card className="border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 overflow-hidden h-fit animate-pulse">
      <CardContent className="p-0 h-full flex flex-col">
        {/* Thumbnail skeleton */}
        <div className="relative h-40 bg-neutral-200 dark:bg-neutral-800">
          <Skeleton className="absolute inset-0 w-full h-full" />
        </div>

        {/* Content */}
        <div className="px-2 flex-1 flex flex-col justify-between">
          <div className="pt-3">
            {/* Page name */}
            <Skeleton className="h-5 w-3/4 bg-neutral-300 dark:bg-neutral-700 mb-2 rounded" />

            {/* Slug */}
            <Skeleton className="h-4 w-1/3 bg-neutral-300 dark:bg-neutral-700 mb-3 rounded" />

            {/* Updated date */}
            <div className="flex items-center space-x-2 mb-3">
              <Skeleton className="h-3 w-3 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
              <Skeleton className="h-3 w-1/2 bg-neutral-300 dark:bg-neutral-700 rounded" />
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex items-center justify-between py-0.5 border-t border-neutral-300 dark:border-neutral-700">
            <div className="flex gap-1">
              <Skeleton className="h-6 w-6 bg-neutral-300 dark:bg-neutral-700 rounded" />
             
            </div>
            <div className="flex gap-1">
              <Skeleton className="h-6 w-6 bg-neutral-300 dark:bg-neutral-700 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
