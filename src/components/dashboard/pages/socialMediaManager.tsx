"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { socialPlatforms } from "@/components/dashboard/socialPlatforms/socialPlatforms"

import type { SocialMedia } from "../types"

interface SocialMediaManagerProps {
  socialMedia: SocialMedia[]
  onSocialMediaUpdate: (socialMedia: SocialMedia[]) => void
}

export function SocialMediaManager({
  socialMedia,
  onSocialMediaUpdate,
}: SocialMediaManagerProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newSocial, setNewSocial] = useState({id:"", platform: "", url: "" })
  const [editingUrl, setEditingUrl] = useState("")

  const addSocialMedia = () => {
    const platform = socialPlatforms.find((p) => p.id === newSocial.platform)
    if (!platform || !newSocial.url) return

    let formattedUrl = newSocial.url.trim()
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("mailto:")
    ) {
      formattedUrl = "https://" + formattedUrl
    }

    const newEntry: SocialMedia = {
      id: platform.id, 
      platform: platform.id,
      url: formattedUrl,
      icon: platform.name,
      color: platform.color,
    }

    onSocialMediaUpdate([...socialMedia, newEntry])
    setNewSocial({ id: "", platform: "", url: "" })
    setShowAddForm(false)
  }

  const updateSocialMedia = (id: string, url: string) => {
    let formattedUrl = url.trim()
    if (
      url &&
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://") &&
      !formattedUrl.startsWith("mailto:")
    ) {
      formattedUrl = "https://" + formattedUrl
    }

    const updated = socialMedia.map((social) =>
      social.id === id ? { ...social, url: formattedUrl } : social
    )

    onSocialMediaUpdate(updated)
    setEditingId(null)
  }

  const deleteSocialMedia = (id: string) => {
    onSocialMediaUpdate(socialMedia.filter((social) => social.id !== id))
  }

  const availablePlatforms = socialPlatforms.filter(
    (platform) => !socialMedia.some((social) => social.id === platform.id)
  )

  return (
    <Card className="border-neutral-50 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-neutral-700 dark:text-neutral-300">
            Social Media
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(true)}
            size="sm"
            className="gap-2 bg-primary hover:bg-primary/90 text-white"
            disabled={availablePlatforms.length === 0}
          >
            <Plus className="w-4 h-4" />
            Add Social
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {showAddForm && (
          <Card className="border-dashed border-neutral-300 bg-neutral-50 dark:bg-neutral-900">
            <CardContent className="pt-4 space-y-3">
              <div>
                <Label className="text-neutral-700 dark:text-neutral-300">Platform</Label>
                <Select
                  value={newSocial.platform}
                  onValueChange={(value) =>
                    setNewSocial({ ...newSocial, platform: value })
                  }
                >
                  <SelectTrigger className="border-neutral-300 dark:border-neutral-600 focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePlatforms.map((platform) => {
                      const IconComponent = platform.icon
                      return (
                        <SelectItem key={platform.id} value={platform.id}>
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-4 h-4" style={{ color: platform.color }} />
                            {platform.name}
                          </div>
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-neutral-700 dark:text-neutral-300">URL</Label>
                <Input
                  placeholder={
                    newSocial.platform
                      ? socialPlatforms.find((p) => p.id === newSocial.platform)?.placeholder
                      : "Select a platform first"
                  }
                  value={newSocial.url}
                  onChange={(e) =>
                    setNewSocial({ ...newSocial, url: e.target.value })
                  }
                  type="url"
                  className="border-neutral-300 dark:border-neutral-600 focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={addSocialMedia}
                  size="sm"
                  className="bg-primary hover:bg-primary/90 text-white"
                >
                  Add
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
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

        <div className="space-y-2">
          {socialMedia.map((social) => {
            const platform = socialPlatforms.find((p) => p.id === social.platform)
            const IconComponent = platform?.icon

            return (
              <div
                key={social.id}
                className="flex items-center gap-3 p-3 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
              >
                {IconComponent && (
                  <div className="flex-shrink-0">
                    <IconComponent className="w-5 h-5" style={{ color: platform?.color }} />
                  </div>
                )}
                {editingId === social.id ? (
                  <div className="flex-1">
                    <Input
                      value={editingUrl}
                      onChange={(e) => setEditingUrl(e.target.value)}
                      onBlur={() => updateSocialMedia(social.id, editingUrl)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") updateSocialMedia(social.id, editingUrl)
                        if (e.key === "Escape") setEditingId(null)
                      }}
                      placeholder={platform?.placeholder}
                      autoFocus
                      className="border-neutral-300 dark:border-neutral-600 focus:border-primary focus:ring-primary"
                    />
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        {platform?.name}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Link
                      </Badge>
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                      {social.url}
                    </div>
                  </div>
                )}
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (editingId === social.id) {
                        setEditingId(null)
                      } else {
                        setEditingUrl(social.url)
                        setEditingId(social.id)
                      }
                    }}
                    className="text-neutral-500 hover:text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteSocialMedia(social.id)}
                    className="text-neutral-500 hover:text-error hover:bg-error/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        {socialMedia.length === 0 && (
          <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
            <div className="text-sm">No social media links added yet</div>
            <div className="text-xs mt-1">Click "Add Social" to get started</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
