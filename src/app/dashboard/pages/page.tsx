"use client"

import { useState, useEffect } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageCard } from "@/components/dashboard/pages/pageCard"
import { CreatePageModal } from "@/components/dashboard/pages/creatPageModal"

export default function MyPages() {
  const [pages, setPages] = useState<Array<any>>([]) // initially empty, will load from API
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch pages from API on mount
  useEffect(() => {
    async function fetchPages() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch('/api/page')
        if (!res.ok) throw new Error('Failed to fetch pages')
        const data = await res.json()
        setPages(data)
      } catch (err: any) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [])

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

        {/* Loading state */}
        {loading && (
          <div className="text-center text-neutral-500">Loading pages...</div>
        )}

        {/* Error state */}
        {error && (
          <div className="text-center text-red-500 mb-4">{error}</div>
        )}

        {/* Pages grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPages.map((page) => (
                <PageCard key={page._id ?? page.id} page={page} onDelete={deletePage} />
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
          </>
        )}

        <CreatePageModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
      </div>
    </div>
  )
}
