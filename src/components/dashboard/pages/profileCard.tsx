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
import type { Profile } from "@/types/pages"

// Compress avatar image before upload
async function compressImage(file: File, maxSize = 256): Promise<Blob> {
  const img = await createImageBitmap(file)
  const canvas = document.createElement("canvas")
  const scale = maxSize / Math.max(img.width, img.height)
  canvas.width = img.width * scale
  canvas.height = img.height * scale
  const ctx = canvas.getContext("2d")
  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
  return await new Promise((res) => canvas.toBlob(blob => res(blob!), "image/jpeg", 0.7))
}

// Upload to API
async function uploadImage(file: File, type: "avatar" | "cover", onProgress: (percent: number) => void): Promise<string | null> {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("type", type)

  const xhr = new XMLHttpRequest()
  return await new Promise((resolve, reject) => {
    xhr.open("POST", "/api/upload", true)

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText)
        resolve(data.url)
      } else {
        reject("Upload failed")
      }
    }

    xhr.onerror = () => reject("Upload failed")
    xhr.send(formData)
  })
}

interface UploadStatus {
  progress: number
  error: string | null
  type: "avatar" | "cover" | null
}

interface ProfileEditorProps {
  profile: Profile
  onProfileUpdate: (profile: Profile) => void
}

export function ProfileCard({ profile, onProfileUpdate }: ProfileEditorProps) {
  const avatarRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<UploadStatus>({ progress: 0, error: null, type: null })

  const handleUpload = async (file: File, type: "avatar" | "cover") => {
    try {
      setStatus({ progress: 0, error: null, type })
      const finalFile = type === "avatar" ? await compressImage(file) : file
      const url = await uploadImage(finalFile as File, type, (p) =>
        setStatus((prev) => ({ ...prev, progress: p }))
      )
      if (!url) throw new Error("Failed to upload")
      onProfileUpdate({ ...profile, [type === "avatar" ? "image" : "coverImage"]: url })
    } catch (err) {
      console.log("Upload error:", err);
      
      setStatus({ progress: 0, error: "Upload failed", type })
    } finally {
      setTimeout(() => setStatus({ progress: 0, error: null, type: null }), 2000)
    }
  }

  return (
    <Card className="border bg-neutral-200 dark:bg-neutral-800">
      <CardContent className="space-y-4 p-4">

        {/* Cover Upload */}
        <div className="space-y-2">
          <Label>Cover Image</Label>
          <div className="relative">
            {profile.coverImage ? (
              <div className="relative w-full h-32 overflow-hidden rounded-lg border">
                <Image
                  src={profile.coverImage}
                  alt="cover"
                  layout="fill"
                  objectFit="cover"
                />
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => onProfileUpdate({ ...profile, coverImage: "" })}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div
                onClick={() => coverRef.current?.click()}
                className="w-full h-32 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer"
              >
                <Upload className="w-6 h-6 text-neutral-500" />
              </div>
            )}
            <input
              ref={coverRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "cover")}
            />
            {status.type === "cover" && status.progress > 0 && (
              <p className="text-xs mt-1">{status.progress}% uploaded</p>
            )}
            {status.type === "cover" && status.error && (
              <p className="text-xs text-red-500">{status.error}</p>
            )}
          </div>
        </div>

        {/* Avatar Upload */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Avatar className="w-20 h-20 border">
              <AvatarImage src={profile.image || ""} className="object-cover" />
              <AvatarFallback>
                <ImagePlus className="w-5 h-5 text-neutral-500" />
              </AvatarFallback>
            </Avatar>
            <input
              ref={avatarRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0], "avatar")}
            />
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 rounded-full"
              onClick={() => avatarRef.current?.click()}
            >
              <Upload className="w-4 h-4" />
            </Button>
            {status.type === "avatar" && status.progress > 0 && (
              <p className="text-xs mt-1">{status.progress}%</p>
            )}
            {status.type === "avatar" && status.error && (
              <p className="text-xs text-red-500">{status.error}</p>
            )}
          </div>
        </div>

        {/* Name & Bio */}
        <div>
          <Label>Name</Label>
          <Input
            value={profile.name}
            onChange={(e) => onProfileUpdate({ ...profile, name: e.target.value })}
          />
        </div>
        <div>
          <Label>Bio</Label>
          <Textarea
            rows={3}
            maxLength={300}
            value={profile.bio}
            onChange={(e) =>
              onProfileUpdate({ ...profile, bio: e.target.value.slice(0, 300) })
            }
          />
          <p className="text-xs text-neutral-500">{profile.bio?.length ?? 0}/300</p>
        </div>
      </CardContent>
    </Card>
  )
}
