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
import clsx from "clsx"

const MAX_FILE_SIZE_MB = 5
const ALLOWED_MIME_TYPES = [
  "image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"
]
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]

async function uploadImage(
  file: File,
  type: "avatar" | "cover",
  onProgress: (p: number) => void
): Promise<string | null> {
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
        try {
          const data = JSON.parse(xhr.responseText)
          resolve(data.url)
        } catch (err) {
          console.log("error:", err);
          
          reject("Invalid response format.")
        }
      } else {
        reject("Upload failed. Server returned error.")
      }
    }
    xhr.onerror = () => reject("Network or server error.")
    xhr.send(formData)
  })
}

async function handleDeleteBlob(
  url: string,
  type: "avatar" | "cover",
  onProfileUpdate: (profile: Profile) => void,
  profile: Profile
) {
  try {
    await fetch("/api/delete", {
      method: "POST",
      body: JSON.stringify({ url }),
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Delete error:", error)
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
  fileInfo?: string
}

interface ProfileEditorProps {
  profile: Profile
  onProfileUpdate: (profile: Profile) => void
}

export function ProfileCard({ profile, onProfileUpdate }: ProfileEditorProps) {
  const avatarRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const [upload, setUpload] = useState<UploadState>({ type: null, progress: 0, error: null })
  const bioLength = profile.bio?.length ?? 0

  const handleUpload = async (file: File, type: "avatar" | "cover") => {
    const ext = file.name.slice(file.name.lastIndexOf(".")).toLowerCase()

    if (!ALLOWED_MIME_TYPES.includes(file.type) || !ALLOWED_EXTENSIONS.includes(ext)) {
      return setUpload({ type, progress: 0, error: "Invalid format. Use JPG, PNG, WEBP, GIF, AVIF." })
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      return setUpload({ type, progress: 0, error: `File too large. Max ${MAX_FILE_SIZE_MB}MB.` })
    }

    setUpload({ type, progress: 0, error: null, fileInfo: `${file.name} (${(file.size / 1024).toFixed(1)} KB)` })

    try {
      const url = await uploadImage(file, type, (progress) =>
        setUpload(prev => ({ ...prev, progress }))
      )
      if (!url) throw new Error("Upload returned no URL")
      onProfileUpdate({ ...profile, [type === "avatar" ? "image" : "coverImage"]: url })
    }  catch (err) {
  console.error(err)
  const errorMessage =
    err instanceof Error ? err.message : "Unknown upload error."
  setUpload({ type, progress: 0, error: errorMessage })
  
}finally {
      setTimeout(() => setUpload({ type: null, progress: 0, error: null }), 4000)
    }
  }

  return (
    <Card className="bg-neutral-200 dark:bg-neutral-800 py-2 border border-neutral-200 dark:border-neutral-600">
      <CardContent className="space-y-4 px-2">
 
        {/* Cover Upload */}
        <div className="space-y-2 relative">
          <Label className="text-neutral-700 dark:text-neutral-300">Cover Image</Label>
          <div
            className={clsx(
              "relative w-full h-32 rounded-lg border-2 bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center",
              profile.coverImage ? "overflow-hidden border-neutral-300 dark:border-neutral-600" : "border-dashed border-neutral-400 dark:border-neutral-600"
            )}
            onClick={() => !profile.coverImage && coverRef.current?.click()}
          >
            {profile.coverImage ? (
              <>
                <Image src={profile.coverImage} alt="Cover" fill className="object-cover" />
                <Button
                  size="sm"
                  variant="outline"
                  className="absolute top-1 right-1 w-6 h-6 p-0 rounded-lg border shadow-md text-neutral-600 hover:text-error hover:dark:text-error bg-neutral-100 dark:bg-neutral-800 z-10"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteBlob(profile.coverImage!, "cover", onProfileUpdate, profile)
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="text-center">
                <Upload className="w-6 h-6 text-neutral-500 mx-auto mb-2" />
                <p className="text-sm text-neutral-500">Click to upload cover image</p>
                <p className="text-xs text-neutral-500 mt-1">
                  Allowed: JPG, PNG, WEBP, GIF, AVIF. Max {MAX_FILE_SIZE_MB}MB.
                </p>
              </div>
            )}
            {upload.type === "cover" && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-sm space-y-1 z-10">
                <Progress value={upload.progress} className="h-1 w-3/4" />
                {upload.error ? (
                  <span className="text-red-300">{upload.error}</span>
                ) : (
                  <span>{upload.fileInfo}</span>
                )}
              </div>
            )}
          </div>
          <input
            ref={coverRef}
            type="file"
            accept={ALLOWED_EXTENSIONS.join(",")}
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleUpload(file, "cover")
              e.target.value = "" // reset input to allow re-uploading same file
            }}
          />
        </div>

        {/* Avatar Upload */}
        <div className="flex items-center gap-4 relative">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-neutral-400 dark:border-neutral-700">
              <AvatarImage src={profile.image || ""} className="object-cover" />
              <AvatarFallback className="bg-neutral-50 dark:bg-neutral-900">
                {!profile.image && <ImagePlus className="w-5 h-5 text-neutral-500 mx-auto" />}
              </AvatarFallback>
            </Avatar>
            {upload.type === "avatar" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full z-10">
                <div className="w-12 h-12 relative">
                  <Progress value={upload.progress} className="h-12 w-12 rounded-full" />
                </div>
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 flex gap-1">
              <Button
                size="sm"
                variant="outline"
                className="w-6 h-6 p-0 rounded-lg border shadow-md text-neutral-600 hover:shadow-none bg-neutral-100 dark:bg-neutral-800 "
                onClick={() => avatarRef.current?.click()}
              >
                <Upload className="w-4 h-4" />
              </Button>
              {profile.image && (
                <Button
                  size="sm"
                  variant="outline"
                  className="w-6 h-6 p-0 rounded-lg border shadow-md text-neutral-600 hover:text-error hover:shadow-none hover:dark:text-error bg-neutral-100 dark:bg-neutral-800 "
                  onClick={() => handleDeleteBlob(profile.image!, "avatar", onProfileUpdate, profile)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
            <input
              ref={avatarRef}
              type="file"
              accept={ALLOWED_EXTENSIONS.join(",")}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void handleUpload(file, "avatar")
                e.target.value = "" // reset input
              }}
            />
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-neutral-700 dark:text-neutral-300">Name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => onProfileUpdate({ ...profile, name: e.target.value })}
          />
        </div>

        {/* Bio */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="bio">Bio</Label>
            <span className={`text-xs ${bioLength > 280 ? "text-red-500" : "text-neutral-500"}`}>
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
