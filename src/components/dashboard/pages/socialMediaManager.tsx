"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { socialPlatforms } from "@/components/dashboard/socialPlatforms/socialPlatforms"

import type { SocialMedia } from "@/types/pages"

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
    <Card className="border-neutral-50 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-2 ">
      <CardHeader className="px-2">
        <div className="flex items-center justify-between ">
          <CardTitle className="text-neutral-700 dark:text-neutral-300">
            Social Media
          </CardTitle>
          <Button
            onClick={() => setShowAddForm(true)}
           
            variant={"default"}
           
            disabled={availablePlatforms.length === 0}
          >
            <Plus className="w-4 h-4" />
            Add Social
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-2">
        {showAddForm && (
          <Card className="border-dashed shadow-none  border-neutral-500 bg-neutral-50   dark:bg-neutral-900"
          >
            <CardContent className="pt-4 space-y-3 !px-2.5 py-1.5">
              <div>
                <Label className="text-neutral-700 mb-1 dark:text-neutral-300">Platform</Label>
                <Select
                  value={newSocial.platform}
                  onValueChange={(value) =>
                    setNewSocial({ ...newSocial, platform: value })
                  }
                >
                  <SelectTrigger className="border-neutral-300 bg-neutral-100 dark:bg-neutral-900 px-1 !py-1 !h-fit text-xs font-semibold dark:border-neutral-600 focus:border-primary focus:ring-primary">
                    <SelectValue placeholder="Select a platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {availablePlatforms.map((platform) => {
                      const IconComponent = platform.icon
                      return (
                        <SelectItem key={platform.id} value={platform.id}>
                          <div className="flex text-xs  items-center gap-2">
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
                <Label className="text-neutral-700 mb-1 dark:text-neutral-300">URL</Label>
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
                  className="border-neutral-300 !py-1 !h-fit dark:border-neutral-600 focus:border-primary focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={addSocialMedia}
                  variant={"default"}
                 className="px-3"
                  
                >
                  Add
                </Button>
                <Button
                  onClick={() => setShowAddForm(false)}
                  variant="outline"
                
                  className="border-neutral-400 dark:border-neutral-300 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 hover:dark:bg-neutral-700 hover:dark:border-neutral-600"
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
                className="flex items-center gap-3 px-2 py-1 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
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
                      className="border-neutral-300 !py-1 !h-fit dark:border-neutral-600 focus:border-primary focus:ring-primary"
                    />
                  </div>
                ) : (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">
                        {platform?.name}
                      </span>
                      {/* <Badge variant="outline" className="text-xs">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Link
                      </Badge> */}
                    </div>
                    <div className="text-sm text-neutral-500 dark:text-neutral-400 truncate">
                      {social.url}
                    </div>
                  </div>
                )}
                <div className="flex gap-1">
                  <Button
                   
                    variant="ghost"
                    onClick={() => {
                      if (editingId === social.id) {
                        setEditingId(null)
                      } else {
                        setEditingUrl(social.url)
                        setEditingId(social.id)
                      }
                    }}
                    className="text-neutral-500 hover:bg-neutral-200   hover:dark:bg-neutral-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                   
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
            <div className="text-xs mt-1">Click &quot;Add Social&quot; to get started</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
