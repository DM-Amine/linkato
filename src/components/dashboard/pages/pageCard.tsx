"use client"

import type React from "react"

import { useState } from "react"
import { Edit2, ExternalLink, Trash2, Calendar, } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


interface PageCardProps {
  page: {
    id: string
    name: string
    slug: string
    createdAt: string
    updatedAt: string
    theme: string
    views: number
    thumbnail: string
  }
  onDelete: (id: string) => void
}

export function PageCard({ page, onDelete }: PageCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }



  const handleCardClick = () => {
    // Navigate to the page using the slug
    window.open(`/dashboard/pages/${page.slug}`, "_blank")
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  const handleDeletePage = async (slug: string) => {
  try {
    const res = await fetch(`/api/page/${slug}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("❌ Delete failed:", errorData.error);
      return;
    }

    onDelete(page.id); // Inform parent to remove from UI
  } catch (error) {
    console.error("🔥 Error deleting page:", error);
  }
};


  return (
    <Card
      className="group border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 overflow-hidden h-[290px] cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {/* Thumbnail with overlay */}
        <div className="relative h-40 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 overflow-hidden">
          <img
            src={page.coverImage || "/placeholder.svg"}
            alt={page.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
        {/* Content */}
        <div className="px-2 flex-1 flex flex-col">
          <div className="">
            {/* Page name */}
            <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2 truncate text-lg 0">
              {page.name}
            </h3>

            {/* URL slug */}
            <div className="flex items-center mb-3">
              <Badge
                variant="outline"
                className="text-xs border-primary bg-primary-light/40 dark:bg-d-primary-light/40 text-neutral-600 dark:text-neutral-300  hover:bg-primary/10 transition-colors"
              >
                /{page.slug}
              </Badge>
            </div>

            {/* Last updated */}
            <div className="flex items-center text-xs text-neutral-500 mb-3">
              <Calendar className="w-3 h-3 mr-1.5 text-neutral-400" />
              <span>Updated {formatDate(page.updatedAt)}</span>
            </div>
          </div>

          {/* Actions footer */}
          <div className="flex items-center justify-between py-0.5 border-t border-neutral-500">
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-neutral-500  hover:bg-primary-light transition-all duration-200"
                onClick={handleActionClick}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-6 w-6 p-0 text-neutral-500 hover:text-info hover:bg-info/10 transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`/${page.slug}`, "_blank")
                }}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-1">
              <Button
  size="sm"
  variant="ghost"
  className="h-6 w-6 p-0 text-neutral-500 hover:text-error hover:bg-error/10 transition-all duration-200"
  onClick={(e) => {
    e.stopPropagation();
    handleDeletePage(page.slug);
  }}
>
  <Trash2 className="w-4 h-4" />
</Button>

             
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
