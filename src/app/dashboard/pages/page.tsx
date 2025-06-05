"use client"

import { useState, useEffect } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PageCard } from "@/components/dashboard/pages/pageCard"
import { CreatePageModal } from "@/components/dashboard/pages/creatPageModal"
import { useSession } from "next-auth/react" //

export default function MyPages() {
  const [pages, setPages] = useState<Array<any>>([]) // initially empty, will load from API
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
    const { data: session, status } = useSession(); //

  // Fetch pages from API on mount
useEffect(() => {
    async function fetchPages() {
      if (!session?.user?.userID) return; // wait until session is ready

      setLoading(true)
      setError(null)

      try {
        const res = await fetch(`/api/page?userID=${session.user.userID}`) // ✅ pass userID
        if (!res.ok) throw new Error("Failed to fetch pages")
        const data = await res.json()
        setPages(data)
      } catch (err: any) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchPages()
  }, [session?.user?.userID])

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
          <Button variant={"default"} className="gap-0 border  !px-2" onClick={openCreateModal}>
            <Plus className="w-4 h-4 mr-2" />
            Create
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
          {filteredPages.length === 0 && (
  <div className="text-center border border-neutral-600 dark:border-neutral-600 border-dashed py-12 bg-neutral-100/90 rounded-lg  dark:bg-neutral-900 ">
    <div className="text-neutral-400 mb-3">
      <Search className="w-12 h-12 mx-auto" />
    </div>
    <h3 className="text-lg font-medium text-neutral-700 dark:text-neutral-200 mb-1">
      {searchQuery ? "No pages found" : "You don't have any pages yet"}
    </h3>
    <p className="text-neutral-500 dark:text-neutral-400 mb-4">
      {searchQuery ? "Try a different search term" : "Start by creating your first page"}
    </p>
    {/* Add Create Button */}
    {!searchQuery && (
      <Button onClick={openCreateModal}>
        <Plus className="w-4 h-4 mr-2" />
        Create Page
      </Button>
    )}
  </div>
)}


          </>
        )}

        <CreatePageModal isOpen={isCreateModalOpen} onClose={closeCreateModal} />
      </div>
    </div>
  )
}
