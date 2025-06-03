"use client"

import { useState, useEffect } from "react"
import { Copy, Check, SquareArrowOutUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ShareProps {
  slug: string
}

export function Share({ slug }: ShareProps) {
  const [copied, setCopied] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const publicUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/${slug}`

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(publicUrl)
    setCopied(true)
    setShowTooltip(true)

    setTimeout(() => {
      setShowTooltip(false)
    }, 1800)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div className="relative w-full flex justify-between items-center gap-4 bg-neutral-50/80 dark:bg-neutral-600/50 rounded-2xl py-2 px-4 shadow-sm ">
      <span className="text-sm whitespace-nowrap text-neutral-700 dark:text-neutral-200">
        Your link is ready:&nbsp;
      </span>

      <div className="text-sm flex justify-between items-center gap-2 w-full bg-primary-light/30 dark:bg-d-primary-light/30 border-2  dark:border shadow-xs border-white dark:border-primary-light rounded-lg pl-2 py-1">
       <Link
  href={publicUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="text-neutral-700 flex underline dark:text-neutral-300 font-medium truncate"
>
  {publicUrl}
  <SquareArrowOutUpRight className="w-4 h-4 m-1 p-px" />
</Link>

        <div className="relative pr-1">
          <Button
            onClick={copyShareLink}
            variant="ghost"
            size="icon"
            className="text-neutral-700 bg-primary dark:bg-d-primary  w-6 h-6 !py-0 transition-colors"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>

          {/* Tooltip with smooth animation */}
          <div
            className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-neutral-900 dark:bg-neutral-200 text-white  dark:text-neutral-700 text-xs font-medium shadow transition-all duration-300
              ${showTooltip ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            Copied!
          </div>
        </div>
      </div>
    </div>
  )
}
