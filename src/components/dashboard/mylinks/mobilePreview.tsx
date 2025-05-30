"use client"

import { Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { socialPlatforms } from "@/components/dashboard/socialPlatforms/socialPlatforms"
import type { Profile, Link, Theme, SocialMedia } from "../types"

interface MobilePreviewProps {
  profile: Profile
  links: Link[]
  socialMedia: SocialMedia[]
    theme: Theme
}

export function MobilePreview({ profile, links, socialMedia, theme }: MobilePreviewProps) {

  return (
    <Card className="border-neutral-50 h-fit  dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-2">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
          <CardTitle className="text-neutral-700 dark:text-neutral-300  ">Mobile Preview</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className=" mx-auto w-80 h-[490px] bg-neutral-900 dark:bg-neutral-200  rounded-[2.5rem] p-2 shadow-xl">
          <div className={`  w-full h-full rounded-[2rem] overflow-hidden ${theme.background}`}>
            <div className="scrollbar-hide h-full overflow-y-auto">
              <div className="relative">
                {/* Cover Image */}
                {profile.coverImage && (
                  <div className="w-full h-32 relative">
                    <img
                      src={profile.coverImage || "/placeholder.svg"}
                      alt="Cover"
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay for better text contrast */}
                    {theme.coverOverlay && <div className={`absolute inset-0 ${theme.coverOverlay}`} />}
                  </div>
                )}

                {/* Profile Content */}
                <div className={`text-center space-y-4 ${profile.coverImage ? "px-6 pb-6" : "p-6"}`}>
                  {/* Profile Section with conditional positioning */}
                  <div className={`space-y-3 ${profile.coverImage ? "-mt-12" : ""}`}>
                    <Avatar className={`${theme.avatar.size} mx-auto ${theme.avatar.border}`}>
                    <AvatarImage src={profile.image || "/placeholder.svg"} className="object-cover" />
                    <AvatarFallback className="text-xl bg-neutral-100 text-neutral-600">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                   <h2 className={`text-lg mb-2 ${theme.text.name}`}>{profile.name}</h2>
                      <p className={`text-sm leading-relaxed ${theme.text.bio}`}>{profile.bio}</p>
                  </div>
                </div>

 {/* Social Media Icons */}
                  {socialMedia.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 py-2 max-w-xs mx-auto">
                      {socialMedia.map((social) => {
                        const platform = socialPlatforms.find((p) => p.id === social.platform)
                        const IconComponent = platform?.icon

                        if (!IconComponent) return null

                        return (
                          <div
                            key={social.id}
                            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border ${theme.socialIcons.background} ${theme.socialIcons.border} ${theme.socialIcons.hover}`}
                          >
                            <IconComponent
                              className="w-5 h-5"
                              style={{
                                 color: theme.socialIcons.iconColor === "platform-color" ? platform?.color : undefined,
                              }}
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}

                <Separator className={theme.separator} />

                {/* Links Preview */}
                <div className="space-y-2 pb-4">
                  {links.map((link) => (
                    <div
                      key={link.id}
                     className={`w-full p-3 rounded-xl text-center cursor-pointer border ${theme.links.background} ${theme.links.text} ${theme.links.border} ${theme.links.hover}`}
                      >
                      {link.title}
                    </div>
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
