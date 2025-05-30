'use client'

import { cn } from "@/lib/utils"
import { CheckCircle, Loader2, Clock } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export type RoadmapStep = {
  title: string
  status: 'done' | 'current' | 'upcoming'
  description: string
}

interface RoadmapCardProps {
  steps: RoadmapStep[]
}

export default function RoadmapCard({ steps }: RoadmapCardProps) {
  return (
    <ol className="relative border-l-2 border-neutral-400 dark:border-neutral-700 pl-6 space-y-12">
      {steps.map((step, index) => (
        <li key={index} className="ml-2 relative group">
          {/* Step Icon */}
          <div
            className={cn(
              "absolute -left-[53px] w-10 h-10 rounded-full flex items-center justify-center",
              step.status === "done" && "bg-success/10 backdrop-blur-2xl",
              step.status === "current" && "bg-warning/10 backdrop-blur-2xl",
              step.status === "upcoming" && "border-neutral-400 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 backdrop-blur-2xl"
            )}
          >
            {step.status === "done" && <CheckCircle className="w-5 h-5 text-green-600" />}
            {step.status === "current" && <Loader2 className="w-5 h-5 text-warning animate-spin" />}
            {step.status === "upcoming" && <Clock className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />}
          </div>

          {/* Step Card using shadcn Card */}
          <Card className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-800 px-3 py-2 rounded-2xl hover:shadow-md transition-all">
            <CardHeader className="p-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
                  {step.title}
                </h3>
                <span
                  className={cn(
                    "text-xs font-medium rounded-lg px-2 py-0.5 whitespace-nowrap",
                    step.status === "done" && "bg-success/20 text-success",
                    step.status === "current" && "bg-warning/20 text-warning",
                    step.status === "upcoming" && "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
                  )}
                >
                  {step.status === "done" && "Completed"}
                  {step.status === "current" && "In Progress"}
                  {step.status === "upcoming" && "Planned"}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-0 mt-2">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {step.description}
              </p>
            </CardContent>
          </Card>
        </li>
      ))}
    </ol>
  )
}
