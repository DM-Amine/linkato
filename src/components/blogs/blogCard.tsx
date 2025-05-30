
// components/BlogCard.tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface BlogCardProps {
  blog: {
    blogID: string
    slug: string
    title: string
    description: string
    image: string
    date: string
  }
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="group h-full">
      <Card className="hover:shadow-lg border-none transition-shadow bg-neutral-100 dark:bg-neutral-900 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-3/2 h-44 overflow-hidden rounded-tl-xl rounded-tr-xl">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <CardHeader className="px-2 pt-1 min-h-[48px]">
          <CardTitle className="text-sm font-semibold line-clamp-2 h-[40px]">
            {blog.title}
          </CardTitle>
        </CardHeader>

        {/* Description + Date */}
        <CardContent className="px-2 dark:text-neutral-200/70 text-neutral-900/80 flex flex-col gap-1 justify-between flex-grow">
          <p className="text-xs line-clamp-2 h-[32px]">
            {blog.description}
          </p>
          <div className="flex items-center gap-1 text-xs border-b border-neutral-400 pb-1">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </CardContent>

        {/* Read More */}
        <div className="px-1">
          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-primary hover:underline w-fit group"
          >
            Read More
            <ArrowRight className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </div>
      </Card>
    </Link>
  )
}
