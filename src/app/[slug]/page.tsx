import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { socialPlatforms } from "@/components/dashboard/socialPlatforms/socialPlatforms"
import { themes } from "@/components/dashboard/themes/themes"
import Link from "next/link"
import Image from "next/image"
import type { Profile, Link as LinkType, Theme, SocialMedia } from "../types"


interface PageData {
  profile: Profile
  content: string
  links: LinkType[]
  socialMedia: SocialMedia[]
  theme: string
}


export default async function PublicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? `http://localhost:3000`
  const res = await fetch(`${baseUrl}/api/page/${slug}` )

  if (res.status === 404) return notFound()
  if (!res.ok) throw new Error("Failed to load page")

  const data = (await res.json()) as PageData
  const { profile, links, socialMedia ,content} = data
  const themeFromDB = data.theme
  const theme = themes.find(t => t.id === themeFromDB)
  const name = profile?.name ?? "No Name"
  const bio = profile?.bio ?? ""
  const image = profile?.image ?? "/placeholder.svg"
  const coverImage = profile?.coverImage

  return (
    <div className={`min-h-screen  flex flex-col items-center ${theme?.background ?? "bg-neutral-100 dark:bg-neutral-900"}`}>
      

      {/* Cover Image */}
      {coverImage && (
        <div className= {` ${theme?.cover_image?.size } mx-4 ${theme?.cover_image?.margin} ${theme?.cover_image?.corners }  overflow-hidden mb-6 ${theme?.cover_image?.shadow } relative`}>
          <Image width={800} height={600} src={coverImage} alt="Cover" className="w-full h-40 object-cover" />
          {theme?.coverOverlay && <div className={`absolute inset-0 ${theme.coverOverlay}`} />}
        </div>
      )}

      {/* Profile Card */}
      <Card className={`max-w-md w-full rounded-xl ${theme?.profile_card?.position } shadow-none border-none`}>
        <CardContent className={`flex flex-col ${theme?.profile_card?.background } items-center space-y-4 py-8 px-6`}>
          <Avatar className={`${theme?.avatar?.size ?? "w-24 h-24"} ${theme?.avatar?.border } ${theme?.avatar?.corners }  mb-2   `}>
            <AvatarImage src={image} alt={name} className="object-cover " />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <h1 className={`text-2xl font-semibold ${theme?.text?.name ?? "text-neutral-900 dark:text-neutral-100"}`}>
            {name}
          </h1>

          {bio && (
            <p className={`text-center text-sm leading-relaxed ${theme?.text?.bio ?? "text-neutral-700 dark:text-neutral-300"}`}>
              {bio}
            </p>
          )}

          {/* Social Media Icons */}
          {socialMedia.length > 0 && (
            <div className="flex gap-4 mt-2">
              {socialMedia.map((social) => {
                const platform = socialPlatforms.find((p) => p.id === social.platform)
                if (!platform) return null
                const Icon = platform.icon
                return (
                  <Link
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border transition-all duration-200 
                      ${theme?.socialIcons?.background ?? "bg-neutral-300 dark:bg-neutral-700"} 
                      ${theme?.socialIcons?.border ?? "border-neutral-400 dark:border-neutral-600"} 
                      ${theme?.socialIcons?.hover ?? "hover:bg-neutral-400 dark:hover:bg-neutral-600"}`}
                    aria-label={platform.name}
                  >
                    <Icon
                      className={`w-5 h-5 ${theme?.socialIcons?.iconColor === "platform-color" ? "" : theme?.socialIcons?.iconColor ?? "text-neutral-800 dark:text-neutral-200"}`}
                      style={{
                        color: theme?.socialIcons?.iconColor === "platform-color" ? platform.color : undefined,
                      }}
                    />
                  </Link>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card> 

      {/* Separator */}
      {/* {theme?.separator && (
        <div className={`h-px w-24 my-6 ${theme.separator.background} ${theme.separator.size}`} />
      )} */}

      
      {/* content */}
{content && (
  <div
    className="sm:max-w-4xl w-full mt-6 px-4 prose dark:prose-invert"
    dangerouslySetInnerHTML={{ __html: content }}
  />
)}



      {/* Links */}
      <div className="max-w-md w-full px-2 mt-8 mb-6 space-y-4  ">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-full text-center py-3 rounded-xl font-medium cursor-pointer border transition-all duration-200
              ${theme?.links?.background ?? "bg-white dark:bg-neutral-700"}
              ${theme?.links?.text ?? "text-neutral-900 dark:text-neutral-100"}
              ${theme?.links?.border ?? "border-neutral-300 dark:border-neutral-600"}
              ${theme?.links?.hover ?? "hover:bg-neutral-200 dark:hover:bg-neutral-600"}`}
          >
            {link.title}
          </Link>
        ))}
      </div>
     
    </div>
  )
}
