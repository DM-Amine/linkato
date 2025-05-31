"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"
import { Plus, Edit2, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Link } from "../types"

interface LinksManagerProps {
  links: Link[]
  onLinksUpdate: (links: Link[]) => void
}

export function LinksManager({ links, onLinksUpdate }: LinksManagerProps) {
  const [editingLink, setEditingLink] = useState<string | null>(null)
  const [editingValues, setEditingValues] = useState<{ title: string; url: string }>({ title: "", url: "" })
  const [newLink, setNewLink] = useState({ title: "", url: "" })
  const [showNewLinkForm, setShowNewLinkForm] = useState(false)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(links)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    onLinksUpdate(items)
  }

  const addLink = () => {
    if (newLink.title && newLink.url) {
      let formattedUrl = newLink.url
      if (!formattedUrl.startsWith("http://") && !formattedUrl.startsWith("https://")) {
        formattedUrl = "https://" + formattedUrl
      }

      const link: Link = {
        id: Date.now().toString(),
        title: newLink.title,
        url: formattedUrl,
      }
      onLinksUpdate([...links, link])
      setNewLink({ title: "", url: "" })
      setShowNewLinkForm(false)
    }
  }

  const updateLink = (id: string, title: string, url: string) => {
    let formattedUrl = url
    if (url && !url.startsWith("http://") && !url.startsWith("https://")) {
      formattedUrl = "https://" + url
    }
    onLinksUpdate(links.map((link) => (link.id === id ? { ...link, title, url: formattedUrl } : link)))
    setEditingLink(null)
    setEditingValues({ title: "", url: "" }) // Reset editing values
  }

  const deleteLink = (id: string) => {
    onLinksUpdate(links.filter((link) => link.id !== id))
  }

  return (
    <Card className="border-neutral-50 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-4">
      <CardHeader className="px-3">
        <div className="flex items-center  justify-between ">
          <CardTitle className="text-neutral-700 dark:text-neutral-300">Links</CardTitle>
          <Button
            onClick={() => setShowNewLinkForm(true)}
            size="sm"
            className="gap-2 bg-primary hover:bg-primary/90 text-white"
          >
            <Plus className="w-4 h-4" />
            Add Link
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-2">
        {showNewLinkForm && (
          <Card className="border-dashed border-neutral-300 bg-neutral-50 dark:bg-neutral-700 py-2">
            <CardContent className="pt-4 space-y-3 text-neutral-700 dark:text-neutral-300">
              <Input
                placeholder="Link title"
                value={newLink.title}
                onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                className="border-neutral-300 focus:border-primary focus:ring-primary"
              />
              <Input
                placeholder="URL (example.com or https://example.com)"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                type="url"
                className="border-neutral-300 focus:border-primary focus:ring-primary"
              />
              <div className="flex gap-2">
                <Button onClick={addLink} size="sm" className="bg-primary hover:bg-primary/90 text-white">
                  Add
                </Button>
                <Button
                  onClick={() => setShowNewLinkForm(false)}
                  variant="outline"
                  size="sm"
                  className="border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="links">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {links.map((link, index) => (
                  <Draggable key={link.id} draggableId={link.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-2 p-3 border border-neutral-200 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700  hover:border-neutral-300 transition-colors"
                      >
                        <div {...provided.dragHandleProps}>
                          <GripVertical className="w-4 h-4 text-neutral-400 dark:text-neutral-200" />
                        </div>

                        {editingLink === link.id ? (
                          <div className="flex-1 space-y-2 ">
                            <Input
                              value={editingValues.title}
                              onChange={(e) => setEditingValues({ ...editingValues, title: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateLink(link.id, editingValues.title, editingValues.url)
                                }
                                if (e.key === "Escape") {
                                  setEditingLink(null)
                                }
                              }}
                              placeholder="Link title"
                              autoFocus
                              className="border-neutral-400  focus:border-primary focus:ring-primary"
                            />
                            <Input
                              value={editingValues.url}
                              onChange={(e) => setEditingValues({ ...editingValues, url: e.target.value })}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  updateLink(link.id, editingValues.title, editingValues.url)
                                }
                                if (e.key === "Escape") {
                                  setEditingLink(null)
                                }
                              }}
                              placeholder="https://example.com"
                              type="url"
                              className="border-neutral-400 focus:border-primary focus:ring-primary"
                            />
                            <div className="flex gap-2 pt-1">
                              <Button
                                onClick={() => updateLink(link.id, editingValues.title, editingValues.url)}
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-white"
                              >
                                Save
                              </Button>
                              <Button
                                onClick={() => setEditingLink(null)}
                                variant="outline"
                                size="sm"
                                className="border-neutral-400 text-neutral-600 hover:bg-neutral-50"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <div className="font-medium text-neutral-700 dark:text-neutral-300">{link.title}</div>
                            <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">{link.url}</div>
                          </div>
                        )}

                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (editingLink === link.id) {
                                setEditingLink(null)
                              } else {
                                setEditingValues({ title: link.title, url: link.url })
                                setEditingLink(link.id)
                              }
                            }}
                            className="text-neutral-500 hover:text-primary hover:bg-primary/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteLink(link.id)}
                            className="text-neutral-500 hover:text-error hover:bg-error/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </CardContent>
    </Card>
  )
}
