import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function SocialMediaManagerSkeleton() {
  return (
    <Card className="border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 overflow-hidden h-fit animate-pulse py-2">
      <CardHeader className="px-2 pb-1 flex items-center justify-between">
        <Skeleton className="h-5 w-32 bg-neutral-300 dark:bg-neutral-700 rounded" />
        <Skeleton className="h-8 w-24 bg-neutral-300 dark:bg-neutral-700 rounded" />
      </CardHeader>
      <CardContent className="space-y-3 px-2 py-1">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-2 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-100 dark:bg-neutral-800"
          >
            <Skeleton className="h-5 w-5 rounded-full bg-neutral-300 dark:bg-neutral-700" />
            <div className="flex-1 min-w-0">
              <Skeleton className="h-4 w-1/2 mb-1 bg-neutral-300 dark:bg-neutral-700 rounded" />
              <Skeleton className="h-3 w-full bg-neutral-300 dark:bg-neutral-700 rounded" />
            </div>
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
