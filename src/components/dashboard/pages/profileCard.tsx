"use client"

import React, { useRef, useState } from "react"
import { Upload, Trash2, ImagePlus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import type { Profile } from "@/types/pages"

async function uploadImage(file: File, type: "avatar" | "cover", onProgress: (p: number) => void): Promise<string | null> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", type)

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "/api/upload")
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        resolve(data.url)
      } else {
        reject("Upload failed")
      }
    }
    xhr.onerror = () => reject("Upload error")
    xhr.send(formData)
  })
}

async function handleDeleteBlob(url: string, type: "avatar" | "cover", onProfileUpdate: (profile: Profile) => void, profile: Profile) {
  try {
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    console.error("Failed to delete blob:", error)
  } finally {
    onProfileUpdate({
      ...profile,
      [type === "avatar" ? "image" : "coverImage"]: "",
    })
  }
}

interface UploadState {
  type: "avatar" | "cover" | null
  progress: number
  error: string | null
}

interface ProfileEditorProps {
  profile: Profile
  onProfileUpdate: (profile: Profile) => void
}

export function ProfileCard({ profile, onProfileUpdate }: ProfileEditorProps) {
  const avatarFileInputRef = useRef<HTMLInputElement>(null)
  const coverFileInputRef = useRef<HTMLInputElement>(null)
  const bioLength = profile.bio?.length ?? 0

  const [upload, setUpload] = useState<UploadState>({ type: null, progress: 0, error: null })

  const handleUpload = async (file: File, type: "avatar" | "cover") => {
    try {
      setUpload({ type, progress: 0, error: null })
      const url = await uploadImage(file, type, (progress) =>
        setUpload(prev => ({ ...prev, progress }))
      )
      if (!url) throw new Error("Upload failed")
      onProfileUpdate({ ...profile, [type === "avatar" ? "image" : "coverImage"]: url })
    } catch (err) {
      console.log("Upload error:", err)
      setUpload({ type, progress: 0, error: "Upload failed" })
    } finally {
      setTimeout(() => setUpload({ type: null, progress: 0, error: null }), 2000)
    }
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
                <Image
                  src={profile.coverImage}
                  alt="Cover"
                  fill
                  className="object-cover"
                />
                {profile.coverImage && (
  <Button
    size="sm"
    variant="outline"
    className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full"
    onClick={() =>
      handleDeleteBlob(profile.coverImage!, "cover", onProfileUpdate, profile)
    }
  >
    <Trash2 className="w-4 h-4" />
  </Button>
)}

              </div>
            ) : (
              <div
                className="w-full h-32 rounded-lg border-2 border-dashed border-neutral-400 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center cursor-pointer"
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
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "cover")}
            />
            {upload.type === "cover" && (
              <div className="mt-1">
                <Progress value={upload.progress} className="h-1" />
                {upload.error && <p className="text-xs text-red-500 mt-1">{upload.error}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-neutral-400 dark:border-neutral-700">
              <AvatarImage src={profile.image || ""} className="object-cover" />
              <AvatarFallback className="flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
                {!profile.image && <ImagePlus className="w-5 h-5 text-neutral-500" />}
              </AvatarFallback>
            </Avatar>

            <div className="absolute -bottom-2 -right-2 flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="w-8 h-8 p-0 rounded-full"
                onClick={() => avatarFileInputRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
              </Button>
             {profile.image && (
  <Button
    size="sm"
    variant="outline"
    className="w-8 h-8 p-0 rounded-full hover:text-error"
    onClick={() =>
      handleDeleteBlob(profile.image!, "avatar", onProfileUpdate, profile)
    }
  >
    <Trash2 className="w-4 h-4" />
  </Button>
)}

            </div>

            <input
              ref={avatarFileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "avatar")}
            />
            {upload.type === "avatar" && (
              <div className="mt-1">
                <Progress value={upload.progress} className="h-1" />
                {upload.error && <p className="text-xs text-red-500 mt-1">{upload.error}</p>}
              </div>
            )}
          </div>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-neutral-700 dark:text-neutral-300">Name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => onProfileUpdate({ ...profile, name: e.target.value })}
          />
        </div>

        {/* Bio Section */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="bio">Bio</Label>
            <span className={`text-xs ${bioLength > 280 ? "text-warning" : "text-neutral-500"}`}>
              {bioLength}/300
            </span>
          </div>
          <Textarea
            id="bio"
            rows={3}
            maxLength={300}
            value={profile.bio}
            onChange={(e) =>
              onProfileUpdate({ ...profile, bio: e.target.value.slice(0, 300) })
            }
          />
        </div>
      </CardContent>
    </Card>
  )
}
