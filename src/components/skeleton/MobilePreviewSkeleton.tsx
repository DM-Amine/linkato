"use client"

import { Card, CardContent, CardHeader} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"


export function MobilePreviewSkeleton() {
  return (
    <Card className="min-w-full border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-900 animate-pulse py-2">
      {/* Header */}
      <CardHeader className="flex items-center justify-center gap-2">
        
         
      </CardHeader>

      {/* Phone frame */}
      <CardContent>
        <div className="mx-auto w-80 h-[490px] bg-neutral-900 dark:bg-neutral-200 rounded-[2.5rem] p-2 shadow-xl">
          <div className="w-full h-full rounded-[2rem] overflow-hidden bg-neutral-50 dark:bg-neutral-800">
            <div className="h-full overflow-y-auto scrollbar-hide">
              {/* Cover image area */}
              <Skeleton className="w-full h-32 rounded-none" />

              <div className="text-center space-y-4 p-6 -mt-12">
                {/* Avatar */}
                <div className="flex justify-center">
                  <Skeleton className="w-20 h-20 rounded-full border-4 border-neutral-200 dark:border-neutral-900" />
                </div>

                {/* Name + Bio */}
                <div>
                  <Skeleton className="h-4 w-28 mx-auto bg-neutral-300 dark:bg-neutral-700 rounded" />
                  <Skeleton className="h-3 w-40 mx-auto mt-2 bg-neutral-300 dark:bg-neutral-700 rounded" />
                </div>

                {/* Social icons */}
                <div className="flex justify-center gap-3 pt-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="w-10 h-10 rounded-full bg-neutral-300 dark:bg-neutral-700" />
                  ))}
                </div>

                {/* Content section */}
                <div className="space-y-2 px-4 pt-4">
                  <Skeleton className="h-3 w-full bg-neutral-300 dark:bg-neutral-700 rounded" />
                  <Skeleton className="h-3 w-5/6 bg-neutral-300 dark:bg-neutral-700 rounded" />
                  <Skeleton className="h-3 w-3/4 bg-neutral-300 dark:bg-neutral-700 rounded" />
                </div>

                {/* Link buttons */}
                <div className="space-y-2 pt-4 pb-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-10 rounded-xl bg-neutral-300 dark:bg-neutral-700" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
