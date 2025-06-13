export interface Profile {
  id: string
  name: string
  bio?: string
  image?: string
  coverImage?: string
}

export interface Link {
  id: string
  title: string
  url: string
  index?: string // Used for reordering
}

export interface SocialMedia {
  id: string
  platform: string
  url: string
  icon: string
  color?: string
}

export interface Theme {
  id: string
  name: string
  isPro: boolean
  preview: string
  background: string

  profile_card: {
    position: string
    Background: string
  }

  cover_image_wrapper: {
    size: string
    margin: string
    shadow: string
    corners: string
  }

  cover_image: {
    size: string
  }

  avatar: {
    position: string
    border: string
    corners: string
    size: string
  }

  text: {
    name: string
    bio: string
  }

  socialIcons: {
    background: string
    border: string
    iconColor: string
    hover: string
  }

  links: {
    background: string
    text: string
    border: string
    hover: string
  }
}

// ✅ Full server-side and client-side compatible page object
export interface PageData {
  _id: string
  id: string
  name: string
  slug: string
  userID: string
  bio?: string
  avatar?: string
  links: Link[]
  socials: SocialMedia[]
  theme: string
  createdAt: string // Store as ISO string for frontend compatibility
  updatedAt: string
  content?: string
  coverImage?: string
  views: number
  thumbnail: string
}
