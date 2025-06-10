"use client"

import type React from "react"

import { useRef } from "react"
import { Upload, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import type { Profile } from "../types"

interface ProfileEditorProps {
  profile: Profile
  onProfileUpdate: (profile: Profile) => void
}

export function ProfileCard({ profile, onProfileUpdate }: ProfileEditorProps) {
  const avatarFileInputRef = useRef<HTMLInputElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onProfileUpdate({ ...profile, image: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onProfileUpdate({ ...profile, coverImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const removeCoverImage = () => {
    onProfileUpdate({ ...profile, coverImage: undefined })
  }

  return (
    <Card className="border-neutral-50 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-2">
     
      <CardContent className="space-y-4 px-2">
        {/* Cover Image Section */}
        <div className="space-y-2">
          <Label className="text-neutral-700 dark:text-neutral-300">Cover Image</Label>
          <div className="relative">
            {profile.coverImage ? (
              <div className="relative w-full h-32 rounded-lg overflow-hidden border-2 border-neutral-300 dark:border-neutral-600">
                <img
                  src={profile.coverImage || "/placeholder.svg"}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-2 right-2 w-8 h-8 rounded-full p-0 bg-white/80 hover:bg-white border-neutral-400"
                  onClick={removeCoverImage}
                >
                  <X className="w-3 h-3 text-neutral-600" />
                </Button>
              </div>
            ) : (
              <div
                className="w-full h-32 rounded-lg border-2 border-dashed border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                onClick={() => coverFileInputRef.current?.click()}
              >
                <div className="text-center">
                  <Upload className="w-6 h-6 text-neutral-500 mx-auto mb-2" />
                  <p className="text-sm text-neutral-500">Click to upload cover image</p>
                </div>
              </div>
            )}
            <input
              ref={coverFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
            />
          </div>
        </div>

        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-neutral-200 dark:border-neutral-700">
              <AvatarImage src={profile.image || "/placeholder.svg"} className="object-cover" />
              <AvatarFallback className="bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300">
              {profile.name?.charAt(0) || "?"}

              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="outline"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0 border-neutral-400 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-50"
              onClick={() => avatarFileInputRef.current?.click()}
            >
              <Upload className="w-3 h-3 text-neutral-600 dark:text-neutral-300" />
            </Button>
            <input
              ref={avatarFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
          </div>
        </div>

        {/* Name Input */}
        <div className="flex-1 space-y-2">
          <div>
            <Label htmlFor="name" className="text-neutral-700 dark:text-neutral-300">
              Name
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => onProfileUpdate({ ...profile, name: e.target.value })}
              placeholder="Your name"
              className="border-neutral-400  dark:border-neutral-600 focus:border-primary focus:ring-primary"
            />
          </div>
        </div>

        {/* Bio Section */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="bio" className="text-neutral-700 dark:text-neutral-300">
              Bio
            </Label>
            <span className={`text-xs ${profile.bio.length > 280 ? "text-warning" : "text-neutral-500"}`}>
              {profile.bio.length}/300
            </span>
          </div>
          <Textarea
            id="bio"
            value={profile.bio}
            onChange={(e) => {
              if (e.target.value.length <= 300) {
                onProfileUpdate({ ...profile, bio: e.target.value })
              }
            }}
            placeholder="Tell people about yourself"
            rows={3}
            maxLength={300}
            className="border-neutral-400 dark:border-neutral-600 focus:border-primary focus:ring-primary resize-none"
          />
        </div>
      </CardContent>
    </Card>
  )
}
