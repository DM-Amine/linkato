"use client"

import { Eye } from "lucide-react"
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

export function MobilePreview({ profile, links, socialMedia, theme, content }: MobilePreviewProps) {
  const name = profile?.name ?? "No Name"
  const bio = profile?.bio ?? ""
  const image = profile?.image ?? ""
  const coverImage = profile?.coverImage

  return (
    <div className="min-w-full border border-neutral-50 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 py-1 px-4 rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 px-4 pb-1">
        <Eye className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Mobile Preview</span>
      </div>

      {/* Mobile Frame */}
      <div key={theme.id} className="mx-auto w-[290px] h-[460px] bg-neutral-900 dark:bg-neutral-200 rounded-3xl p-1 shadow-xl">
        <div className={`w-full h-full rounded-3xl overflow-hidden ${theme?.background ?? ""}`}>
          <div className="scrollbar-hide h-full overflow-y-auto">
            <div className="relative">
              {/* Cover Image */}
              {coverImage && (
                <div className="w-full h-fit">
                  <Image
                    width={800}
                    height={600}
                    src={coverImage}
                    alt="Cover"
                    className="w-full h-auto"
                  />
                </div>
              )}

              {/* Profile Info */}
              <div className={`text-center space-y-4 ${coverImage ? "px-6 pb-6" : "p-6"}`}>
                <div className="space-y-3">
                  {image && (
                    <div
                      className={`${theme?.avatar?.size ?? "w-20 h-20"} mx-auto ${theme?.avatar?.border ?? ""} ${theme?.avatar?.corners ?? ""} overflow-hidden`}
                    >
                      <Image width={600} height={400} src={image} alt={name} className="object-cover w-full h-full" />
                    </div>
                  )}

                  <div>
                    <h2 className={`text-lg mb-2 font-semibold ${theme?.title?.color ?? ""}`}>{name}</h2>
                    <p className={`text-sm leading-relaxed ${theme?.bio?.color ?? ""} ${theme?.bio?.size ?? ""}`}>
                      {bio}
                    </p>
                  </div>
                </div>

                {/* Social Media Icons */}
                {socialMedia.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 py-2 max-w-xs mx-auto">
                    {socialMedia.map((social) => {
                      const platform = socialPlatforms.find((p) => p.id === social.platform)
                      const Icon = platform?.icon
                      if (!Icon) return null

                      return (
                        <div
                          key={social.id}
                          className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border transition-all duration-200
                            ${theme?.socialIcons?.background ?? ""}
                            ${theme?.socialIcons?.border ?? ""}
                            ${theme?.socialIcons?.hover ?? ""}
                          `}
                        >
                          <Icon
                            className={`w-5 h-5 ${theme?.socialIcons?.iconColor === "platform-color" ? "" : theme?.socialIcons?.iconColor ?? ""}`}
                            style={{
                              color: theme?.socialIcons?.iconColor === "platform-color"
                                ? platform?.color
                                : undefined
                            }}
                          />
                        </div>
                      )
                    })}
                  </div>
                )}

                {/* Content */}
                {content && (
                  <div
                    className="mx-auto px-4 pb-6 prose dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                )}

                {/* Links */}
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
    </div>
  )
}
