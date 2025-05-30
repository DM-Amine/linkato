"use client"

import { useState } from "react"
import { ProfileCard } from "@/components/dashboard/mylinks/profileCard"
import { LinksManager } from "@/components/dashboard/mylinks/linkManager"
import { SocialMediaManager } from "@/components/dashboard/mylinks/socialMediaManager"

import { ThemeCustomizer } from "@/components/dashboard/mylinks/themeCutomizer"

import { MobilePreview } from "@/components/dashboard/mylinks/mobilePreview"
import { Share } from "@/components/dashboard/mylinks/share"
import type { Profile, Link, SocialMedia, Theme } from "./types"
import { themes } from "@/components/dashboard/themes/themes"

const initialProfile: Profile = {
  name: "Your Name",
  bio: "Welcome to my link page! Find all my important links below.",
  image: "/placeholder.svg?height=100&width=100",
}

const initialLinks: Link[] = [
  { id: "1", title: "My Website", url: "https://example.com" },
  { id: "2", title: "Instagram", url: "https://instagram.com/username" },
  { id: "3", title: "Twitter", url: "https://twitter.com/username" },
]

const initialSocialMedia: SocialMedia[] = []


export default function Dashboard() {
  const [profile, setProfile] = useState<Profile>(initialProfile)
  const [links, setLinks] = useState<Link[]>(initialLinks)
    const [socialMedia, setSocialMedia] = useState<SocialMedia[]>(initialSocialMedia)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0])


  return (
    <div className="min-h-screen bg-neutral-300 dark:bg-neutral-900/70 rounded-xl p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              {/* <h1 className="text-3xl font-bold text-neutral-800">Dashboard</h1> */}
              <Share profileName={profile.name} />
            </div>

            {/* Profile Section */}
            <ProfileCard profile={profile} onProfileUpdate={setProfile} />

 {/* Social Media Section */}
            <SocialMediaManager socialMedia={socialMedia} onSocialMediaUpdate={setSocialMedia} />
            {/* Links Section */}
            <LinksManager links={links} onLinksUpdate={setLinks} />

            {/* Design Section */}
            <ThemeCustomizer selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />
          </div>

          {/* Mobile Preview */}
          <div className="lg:sticky lg:top-0 lg:h-fit">
             <MobilePreview profile={profile} links={links} socialMedia={socialMedia} theme={selectedTheme} />
          </div>
        </div>
      </div>
    </div>
  )
}
