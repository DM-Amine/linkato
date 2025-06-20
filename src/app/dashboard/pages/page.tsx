"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Plus, Search } from "lucide-react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageCardSkeleton } from "@/components/skeleton/PageCardSkeleton"
import { CreatePageModal } from "@/components/dashboard/pages/creatPageModal"
import type { PageData } from "@/types/pages"

// Lazy load PageCard (better initial load performance)
const PageCard = dynamic(
  () => import("@/components/dashboard/pages/pageCard").then((mod) => mod.PageCard),
  {
    loading: () => <PageCardSkeleton />,
    ssr: false,
  }
)

export default function MyPages() {
  const [pages, setPages] = useState<PageData[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { data: session, status } = useSession()
  const isSessionLoading = status === "loading"

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  // Fetch user pages
  useEffect(() => {
    async function fetchPages() {
      if (!session?.user?.userID) return

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/page?userID=${session.user.userID}`, {
          cache: "no-store",
        })
        if (!res.ok) throw new Error("Failed to fetch pages")
        const data: PageData[] = await res.json()
        setPages(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Something went wrong"
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    if (session) {
      fetchPages()
    }
  }, [session])

  const filteredPages = pages.filter((page) =>
    page.name?.toLowerCase().includes(debouncedQuery.toLowerCase())
  )

  const deletePage = (id: string) => {
    setPages((prev) => prev.filter((page) => page.id !== id))
  }

  const openCreateModal = () => setIsCreateModalOpen(true)
  const closeCreateModal = () => setIsCreateModalOpen(false)

  // Show loading state during session fetch
  if (isSessionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-500 dark:text-neutral-300">Loading session...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200">
            My Pages
          </h1>
          <Button variant="default" className="gap-0 border !px-2" onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-1.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <Input
            placeholder="Search pages..."
            className="pl-7 sm:w-4/12 w-full h-7 border-neutral-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && <div className="text-center text-red-500 mb-4">{error}</div>}

        {/* Page Cards */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <PageCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPages.map((page) => (
                <PageCard
                  key={page._id ?? page.id}
                  page={page}
                  onDelete={deletePage}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredPages.length === 0 && (
              <div className="text-center border border-neutral-600 dark:border-neutral-600 border-dashed py-12 bg-neutral-100/90 rounded-lg dark:bg-neutral-900 mt-6">
                <div className="text-neutral-400 mb-3">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200 mb-1">
                  {debouncedQuery ? "No pages found" : "You don't have any pages yet"}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400 mb-4">
                  {debouncedQuery ? "Try a different search term" : "Start by creating your first page"}
                </p>
                {!debouncedQuery && (
                  <Button onClick={openCreateModal} className="py-4 !px-4 rounded-xl">
                    <Plus className="w-4 h-4" />
                    Create Page
                  </Button>
                )}
              </div>
            )}
          </>
        )}

        {/* Modal */}
        <CreatePageModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
      </div>
    </div>
  )
}
