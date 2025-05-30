"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ShareProps {
  profileName: string
}

export function Share({ profileName }: ShareProps) {
  const [copied, setCopied] = useState(false)

  const copyShareLink = async () => {
    const shareUrl = `${window.location.origin}/u/${profileName.toLowerCase().replace(/\s+/g, "")}`
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button onClick={copyShareLink} className="gap-2 bg-primary hover:bg-primary/90 text-white">
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "Copied!" : "Share Link"}
    </Button>
  )
}
