"use client"

import { Check, Crown, Lock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type {  Theme } from "@/types/pages"

interface ThemePreviewCardProps {
  theme: Theme
  isSelected: boolean
  onSelect: () => void
}

export function ThemePreviewCard({ theme, isSelected, onSelect }: ThemePreviewCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`relative w-full p-4 rounded-lg border-2 transition-all hover:border-primary/50 ${
        isSelected ? "border-primary" : "border-neutral-200 dark:border-neutral-700"
      } group text-left bg-neutral-50 dark:bg-neutral-900`}
    >
      <div className="space-y-3">
        {/* Theme Preview */}
        <div className="flex justify-center">
          <div
            className={`w-20 h-24 rounded-lg overflow-hidden border border-neutral-200 relative ${theme.background}`}
          >
            {/* Mini Profile Preview */}
            <div className="p-2 text-center space-y-1">
              {/* Mini Avatar */}
              <div className={`w-4 h-4 rounded-full mx-auto ${theme.avatar.border.replace("border-", "bg-")}`} />

              {/* Mini Name */}
              <div
                className={`h-1 w-8 mx-auto rounded ${theme.text.name.includes("white") ? "bg-white" : "bg-neutral-800"}`}
              />

              {/* Mini Bio */}
              <div
                className={`h-0.5 w-6 mx-auto rounded ${theme.text.bio.includes("white") ? "bg-white/70" : "bg-neutral-600"}`}
              />

              {/* Mini Social Icons */}
              <div className="flex justify-center gap-0.5 py-0.5">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${theme.socialIcons.background.includes("white") ? "bg-white" : theme.socialIcons.background.includes("neutral") ? "bg-neutral-600" : "bg-white/20"}`}
                  />
                ))}
              </div>

              {/* Mini Links */}
              <div className="space-y-0.5">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className={`h-1 w-full rounded ${theme.links.background.includes("white") ? "bg-white" : theme.links.background.includes("neutral") ? "bg-neutral-600" : "bg-white/20"}`}
                  />
                ))}
              </div>
            </div>

            {/* Pro overlay */}
            {theme.isPro && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Lock className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Theme Info */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h3 className="font-medium text-neutral-700 dark:text-neutral-300 text-sm">{theme.name}</h3>
            {theme.isPro && <Crown className="w-3 h-3 text-warning" />}
          </div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{theme.isPro ? "Premium" : "Free"}</p>
        </div>

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary text-white p-1">
              <Check className="w-3 h-3" />
            </Badge>
          </div>
        )}

        {/* Pro Badge */}
        {theme.isPro && (
          <div className="absolute top-2 left-2">
            <Badge className="text-xs px-1 bg-warning text-white">PRO</Badge>
          </div>
        )}
      </div>
    </button>
  )
}
