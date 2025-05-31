"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {CreatePageModal} from "@/components/dashboard/pages/creatPageModal"
import { PageCard } from "@/components/dashboard/pages/pageCard"

// Sample data for pages
const initialPages = [
  {
    id: "1",
    name: "My Personal Links",
    slug: "personal-links",
    createdAt: "2023-10-15T10:30:00Z",
    updatedAt: "2023-10-20T14:45:00Z",
    theme: "minimal-light",
    views: 1245,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "2",
    name: "Business Profile",
    slug: "business-profile",
    createdAt: "2023-09-05T08:20:00Z",
    updatedAt: "2023-10-18T11:30:00Z",
    theme: "gradient-sunset",
    views: 3782,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "3",
    name: "Photography Portfolio",
    slug: "photography",
    createdAt: "2023-08-22T16:15:00Z",
    updatedAt: "2023-10-10T09:20:00Z",
    theme: "ocean-depths",
    views: 952,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "4",
    name: "Music Links",
    slug: "music-links",
    createdAt: "2023-07-12T13:40:00Z",
    updatedAt: "2023-09-28T17:10:00Z",
    theme: "neon-cyber",
    views: 2134,
    thumbnail: "/placeholder.svg?height=200&width=150",
  },
]

export default function MyPages() {
  const [pages, setPages] = useState(initialPages)
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const filteredPages = pages.filter((page) => page.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const deletePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id))
  }

   const openCreateModal = () => {
    setIsCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setIsCreateModalOpen(false)
  }

  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">My Pages</h1>
            <p className="text-neutral-500 mt-1">Manage all your link pages in one place</p>
          </div>
         <Button className="bg-primary hover:bg-primary/90 text-white" onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Page
          </Button>
        </div>

        {/* Search and filters */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <Input
              placeholder="Search pages..."
              className="pl-10 border-neutral-500 focus:border-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Pages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create new page card */}
          

          {/* Page cards */}
          {filteredPages.map((page) => (
            <PageCard key={page.id} page={page} onDelete={deletePage} />
          ))}
        </div>

        {/* Empty state */}
        {filteredPages.length === 0 && searchQuery && (
          <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
            <div className="text-neutral-400 mb-3">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-neutral-700 mb-1">No pages found</h3>
            <p className="text-neutral-500">Try a different search term</p>
          </div>
        )}
        <CreatePageModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
      </div>
    </div>
  )
}
