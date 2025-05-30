// components/FeatureCard.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface FeatureCardProps {
  feature: {
    slug: string
    title: string
    description: string
    category: string
    image: string
    createdAt: string
  }
}

export function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Link href={`/features`} className="group h-full">
      <Card className="hover:shadow-md transition-shadow group cursor-pointer h-full">
        {/* Image */}
        <CardHeader className="p-0 relative aspect-video overflow-hidden rounded-t-xl">
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </CardHeader>

        {/* Content */}
        <CardContent className="px-2 py-2 space-y-1">
          {/* Meta */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1 border-neutral-400 pb-1">
              <CalendarIcon className="w-4 h-4" />
              <span>
                {new Date(feature.createdAt).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <Badge
              variant="outline"
              className="text-xs border-muted-foreground"
            >
              {feature.category}
            </Badge>
          </div>

          {/* Title */}
          <CardTitle className="text-base font-medium mt-1">
            {feature.title}
          </CardTitle>

          {/* Description */}
          <CardDescription className="text-sm text-muted-foreground">
            {feature.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
