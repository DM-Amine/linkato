"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExternalLink, Trash2, Calendar, ImageOff, Eye } from "lucide-react"
import { DeletePageModal } from "@/components/dashboard/pages/deletePageModal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

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
    coverImage?: string
  }
  onDelete: (id: string) => void
}

export function PageCard({ page, onDelete }: PageCardProps) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  const handleDeletePage = async () => {
    try {
      const res = await fetch(`/api/page/${page.slug}`, { method: "DELETE" })
      if (!res.ok) {
        const errorData = await res.json()
        console.error("❌ Delete failed:", errorData.error)
        return
      }
      onDelete(page.id)
      setShowDeleteModal(false)
    } catch (error) {
      console.error("🔥 Error deleting page:", error)
    }
  }

  const handleCardClick = () => {
    router.push(`/dashboard/pages/${page.slug}`)
  }

  return (
    <>
      <Card
        className="group border-neutral-500 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-900 overflow-hidden h-fit cursor-pointer transition-all duration-300 hover:shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative h-40 bg-gradient-to-br from-neutral-100 to-neutral-200/5 dark:from-neutral-800 dark:to-neutral-700 overflow-hidden">
            {page.coverImage ? (
              <Image
                src={page.coverImage}
                alt={page.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="100%"
              />
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full text-neutral-400 dark:text-neutral-500">
                <ImageOff className="w-10 h-10" />
                <p>No cover image!</p>
              </div>
            )}

            {/* Optional hover icon */}
            {isHovered && (
              <div className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
                <Eye className="w-4 h-4" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="px-2 flex-1 flex flex-col">
            <div>
              <h3 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-1 truncate text-lg">
                {page.name}
              </h3>

              <div className="flex items-center mb-1">
                <Badge
                  variant="outline"
                  className="text-xs max-w-full !truncate border-primary bg-primary-light/40 dark:bg-d-primary-light/40 text-neutral-600 dark:text-neutral-300 hover:bg-primary/10 transition-colors"
                >
                  /{page.slug}
                </Badge>
              </div>

              <div className="flex items-center text-xs text-neutral-500 mb-2">
                <Calendar className="w-3 h-3 mr-1.5 text-neutral-400" />
                <span>Updated {formatDate(page.updatedAt)}</span>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between py-0.5 border-t border-neutral-500">
              <div className="flex gap-1">
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
                    e.stopPropagation()
                    setShowDeleteModal(true)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showDeleteModal && (
        <DeletePageModal
          open={showDeleteModal}
          onConfirm={handleDeletePage}
          onCancel={() => setShowDeleteModal(false)}
          pageName={page.name}
        />
      )}
    </>
  )
}
