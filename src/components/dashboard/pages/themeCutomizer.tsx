"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Grid, Star } from "lucide-react"
import { ThemePreviewCard } from "@/components/dashboard/pages/themePreviewCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { themes } from "@/components/dashboard/themes/themes"
import type { Theme } from "../types"

interface ThemeCustomizerProps {
  // Optional props if you want external control
  initialThemeId?: string
  onThemeChange?: (theme: Theme) => void
}

export function ThemeCustomizer({ initialThemeId = "minimal-light", onThemeChange }: ThemeCustomizerProps) {
  // Find the initial theme by id, fallback to first theme if not found
  const defaultTheme = themes.find((t) => t.id === initialThemeId) || themes[0]

  // Internal state for selected theme
  const [selectedTheme, setSelectedTheme] = useState<Theme>(defaultTheme)

  // Effect to call onThemeChange callback when theme changes externally
useEffect(() => {
  const newTheme = themes.find((t) => t.id === initialThemeId)
  if (newTheme && newTheme.id !== selectedTheme.id) {
    setSelectedTheme(newTheme)
    onThemeChange?.(newTheme) // ✅ Notify parent
  }
}, [initialThemeId])

  const freeThemes = themes.filter((theme) => !theme.isPro)
  const proThemes = themes.filter((theme) => theme.isPro)
useEffect(() => {
  console.log("🧪 Initial selectedTheme.id:", selectedTheme?.id);
}, [selectedTheme]);
  return (
    <Card className="border-neutral-50 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-4">
      <CardHeader>
        <CardTitle className="text-neutral-700 dark:text-neutral-300">Themes</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6 bg-neutral-300 dark:bg-neutral-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Grid className="w-4 h-4 mr-2" />
              All
            </TabsTrigger>
            <TabsTrigger value="free" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Star className="w-4 h-4 mr-2" />
              Free
            </TabsTrigger>
            <TabsTrigger value="pro" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              <Crown className="w-4 h-4 mr-2" />
              Pro
            </TabsTrigger>
          </TabsList>

          {/* All Themes Tab */}
          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <ThemePreviewCard
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedTheme.id === theme.id}
                  onSelect={() => {
  setSelectedTheme(theme);
  onThemeChange?.(theme); // ✅ Notify parent about the new theme
}}

                />
              ))}
            </div>
          </TabsContent>

          {/* Free Themes Tab */}
          <TabsContent value="free" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {freeThemes.map((theme) => (
                <ThemePreviewCard
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedTheme.id === theme.id}
                  onSelect={() => setSelectedTheme(theme)}
                />
              ))}
            </div>
          </TabsContent>

          {/* Pro Themes Tab */}
          <TabsContent value="pro" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {proThemes.map((theme) => (
                <ThemePreviewCard
                  key={theme.id}
                  theme={theme}
                  isSelected={selectedTheme.id === theme.id}
                  onSelect={() => setSelectedTheme(theme)}
                />
              ))}
            </div>

            {/* Pro upgrade message */}
            <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-center gap-2 text-sm text-warning-600 dark:text-warning-400 mb-2">
                <Crown className="w-4 h-4" />
                <span className="font-medium">Upgrade to Pro</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Unlock premium themes with advanced styling and animations
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
