"use client"

import { useState } from "react"
import { ProfileCard } from "@/components/dashboard/pages/profileCard"
import { LinksManager } from "@/components/dashboard/pages/linkManager"
import { SocialMediaManager } from "@/components/dashboard/pages/socialMediaManager"

import { ThemeCustomizer } from "@/components/dashboard/pages/themeCutomizer"

import { MobilePreview } from "@/components/dashboard/pages/mobilePreview"
import { Share } from "@/components/dashboard/pages/share"
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
    <div className="min-h-screen bg-neutral-300 dark:bg-neutral-900/70  p-4">
      <div className="w-full mx-auto">
        <div className="flex min-w-full justify-between ">
          {/* Editor Panel */}
          <div className="w-full mx-3 space-y-6">
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
          <div className="w-4/12 lg:sticky lg:top-0 lg:h-fit">
            <MobilePreview profile={profile} links={links} socialMedia={socialMedia} theme={selectedTheme} />
          </div>
        </div>
      </div>
    </div>
  )
}
