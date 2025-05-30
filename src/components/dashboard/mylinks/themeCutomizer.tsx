"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Grid, Star } from "lucide-react"
import { ThemePreviewCard } from "@/components/dashboard/mylinks/themePreviewCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Check, Crown, Lock, Grid, Star } from "lucide-react"
import { themes } from "@/components/dashboard/themes/themes"
import type { Theme } from "../types"

interface ThemeCustomizerProps {
  selectedTheme: Theme
  onThemeChange: (theme: Theme) => void
}

export function ThemeCustomizer({ selectedTheme, onThemeChange }: ThemeCustomizerProps) {
  const freeThemes = themes.filter((theme) => !theme.isPro)
  const proThemes = themes.filter((theme) => theme.isPro)

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
                  onSelect={() => onThemeChange(theme)}
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
                  onSelect={() => onThemeChange(theme)}
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
                  onSelect={() => onThemeChange(theme)}
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

// Extracted ThemeCard component for reusability
// function ThemeCard({ theme, isSelected, onSelect }: { theme: Theme; isSelected: boolean; onSelect: () => void }) {
//   return (
//     <button
//       onClick={onSelect}
//       className={`relative p-3 rounded-lg border-2 transition-all hover:border-primary/50 ${
//         isSelected ? "border-primary" : "border-neutral-200 dark:border-neutral-700"
//       } group`}
//     >
//       <div
//         className="w-full h-12 rounded-md mb-2 border border-neutral-200 relative overflow-hidden"
//         style={{ background: theme.preview }}
//       >
//         {/* Pro overlay */}
//         {theme.isPro && (
//           <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//             <Lock className="w-4 h-4 text-white" />
//           </div>
//         )}
//       </div>
//       <div className="text-xs font-medium text-neutral-600 dark:text-neutral-400 flex items-center gap-1">
//         {theme.name}
//         {theme.isPro && <Crown className="w-3 h-3 text-warning" />}
//       </div>
//       {isSelected && (
//         <div className="absolute top-1 right-1">
//           <Badge className="text-xs px-1 bg-primary text-white">
//             <Check className="w-3 h-3" />
//           </Badge>
//         </div>
//       )}
//       {/* Pro badge */}
//       {theme.isPro && (
//         <div className="absolute top-1 left-1">
//           <Badge className="text-xs px-1 bg-warning text-white">PRO</Badge>
//         </div>
//       )}
//     </button>
//   )
// }
