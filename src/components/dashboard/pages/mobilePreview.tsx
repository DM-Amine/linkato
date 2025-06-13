"use client"

import { Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { socialPlatforms } from "@/components/dashboard/socialPlatforms/socialPlatforms"
import Image from "next/image"
import type { Profile, Link, SocialMedia, Theme } from "@/types/pages"

interface MobilePreviewProps {
  profile: Profile
  content: string
  links: Link[]
  socialMedia: SocialMedia[]
  theme: Theme
}

export function MobilePreview({ profile, links, socialMedia, theme,content }: MobilePreviewProps) {
  // Defensive defaults for profile properties
  const name = profile?.name ?? "No Name";
  const bio = profile?.bio ?? "";
  const image = profile?.image ?? "";
  const coverImage = profile?.coverImage;

  return (
    <Card className="min-w-full border-neutral-50 h-fit dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-2">
      <CardHeader>
        <div className="flex items-center justify-center gap-2">
          <Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
          <CardTitle className="text-neutral-700 dark:text-neutral-300">Mobile Preview</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {/* Add a key here to remount component on theme change */}
        <div key={theme.id} className="mx-auto w-80 h-[490px] bg-neutral-900 dark:bg-neutral-200 rounded-[2.5rem] p-2 shadow-xl">
          <div className={`w-full h-full rounded-[2rem] overflow-hidden ${theme?.background ??  ""}`}>
            <div className="scrollbar-hide h-full overflow-y-auto">
              <div className="relative">
                {/* Cover Image */}
                {coverImage && (
                  <div className="w-full h-32 relative">
                    <Image width={800} height={600} src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                    {/* {theme?.coverOverlay && <div className={`absolute inset-0 ${theme.coverOverlay}`} />} */}
                  </div>
                )}

                {/* Profile Content */}
                <div className={`text-center space-y-4 ${coverImage ? "px-6 pb-6" : "p-6"}`}>
                  <div className={`space-y-3 ${coverImage ? "-mt-12" : ""}`}>
                    {image && (
                      <Avatar
                        className={`${theme?.avatar?.size ?? "w-20 h-20"} mx-auto ${
                          theme?.avatar?.border ?? "border-neutral-200"
                        }`}
                      >
                        <AvatarImage src={image} className="object-cover" />
                        <AvatarFallback className="text-xl bg-neutral-100 text-neutral-600">{name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <h2 className={`text-lg mb-2 ${theme?.text?.name ?? ""}`}>{name}</h2>
                      <p className={`text-sm leading-relaxed ${theme?.text?.bio ?? ""}`}>{bio}</p>
                    </div>
                  </div>

                  {/* Social Media Icons */}
                  {socialMedia.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 py-2 max-w-xs mx-auto">
                      {socialMedia.map((social) => {
                        const platform = socialPlatforms.find((p) => p.id === social.platform);
                        const IconComponent = platform?.icon;

                        if (!IconComponent) return null;

                        return (
                          <div
                            key={social.id}
                            className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border transition-all duration-200
                              ${theme?.socialIcons?.background ?? ""}
                              ${theme?.socialIcons?.border ?? ""}
                              ${theme?.socialIcons?.hover ?? ""}
                            `}
                          >
                            <IconComponent
                              className={`w-5 h-5 ${
                                theme?.socialIcons?.iconColor === "platform-color" ? "" : theme?.socialIcons?.iconColor ?? ""
                              }`}
                              style={{
                                color: theme?.socialIcons?.iconColor === "platform-color" ? platform?.color : undefined,
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Content Preview */}
                  {content && (
  <div
    className="mx-auto px-4 pb-6"
    dangerouslySetInnerHTML={{ __html: content }}
  />
)}

                  {/* Links Preview */}
                  <div className="space-y-2 pb-4">
                    {links.map((link) => (
                      <div
                        key={link.id}
                        className={`w-full p-3 rounded-xl text-center cursor-pointer border transition-all duration-200
                          ${theme?.links?.background ?? ""}
                          ${theme?.links?.text ?? ""}
                          ${theme?.links?.border ?? ""}
                          ${theme?.links?.hover ?? ""}
                        `}
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
  );
}

