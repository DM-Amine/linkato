
import type { Theme } from "@/types/pages"

export const themes: Theme[] = [
  // FREE THEMES
 {
  id: "minimal-light",
  name: "Minimal Light",
  isPro: false,
  preview: "#F8F8F8",

  background: "bg-neutral-200",

  profile_card: {
    position: "", // add this key for consistency
    Background: "bg-neutral-200", // previously was wrongly set to dark
  },

  cover_image_wrapper: {
    size: "sm:w-9/12 w-full",
    margin: "sm:my-2",
    shadow: "",
    corners: "sm:rounded-lg rounded-none",
  },

  cover_image: {
    size: "w-full h-50", // keep consistent with dark theme
  },

  avatar: {
    position: "",
    border: "border-neutral-300 border-4",
    corners: "rounded-full",
    size: "w-24 h-24",
  },

  // text: {
  //   name: "text-neutral-800",
  //   bio: "text-neutral-700",
  // },
      title: {
      color: "text-neutral-800",
      size: "",
      font: "",
    },
    bio: {
      color: "text-neutral-600",
      size: "max-w-lg text-center text-sm leading-relaxed",
      font: "",
    },

  socialIcons: {
    background: "bg-neutral-100",
    border: "border-neutral-400",
    iconColor: "text-neutral-700",
    hover: "hover:bg-neutral-50 hover:scale-110 hover:shadow-lg",
  },

  links: {
    background: "bg-neutral-100",
    text: "text-neutral-700",
    border: "border-neutral-500",
    hover: "hover:bg-neutral-50/90 hover:scale-102 hover:shadow-lg",
  },


   
  },
  {
    id: "minimal-dark", 
    name: "Minimal Dark",
    isPro: false,
    preview: "#1A1A1A",

    background: "bg-neutral-900 ",

    profile_card:{
      position : "",
      Background : "bg-neutral-900"
    },
    cover_image_wrapper : {
      size : "sm:w-9/12 w-full h-fit",
      margin: "sm:my-2 ",
      shadow: "",
      corners : "sm:rounded-lg rounded-none",
    },

    cover_image:{
      size:"w-full h-50",
    },

    avatar: {
      position : "",
      border: "border-neutral-900 border-4",
      corners : "rounded-full",
      size: "w-24 h-24",
    },
    // text: {
    //   name: "text-white",
    //   bio: "text-neutral-300",
    // },
      title: {
      color: "text-neutral-100",
      size: "",
      font: "",
    },
    bio: {
      color: "text-neutral-400 ",
      size: "max-w-lg  text-center text-sm leading-relaxed",
      font: "",
    },
    socialIcons: {
      background: "bg-neutral-800",
      border: "border-neutral-700",
      iconColor: "text-white",
      hover: "hover:bg-neutral-700 hover:scale-110",
    },
    links: {
      background: "bg-neutral-800",
      text: "text-white",
      border: "border-neutral-700",
      hover: "hover:bg-neutral-700 hover:scale-102 hover:shadow-lg",
    },

  },
  // {
  //   id: "primary-classic",
  //   name: "Primary Classic",
  //   isPro: false,
  //   preview: "#DF5D23",
  //   background: "bg-primary",
  //   avatar: {
  //     border: "border-white",
  //     size: "w-20 h-20",
  //   },
  //   text: {
  //     name: "text-white",
  //     bio: "text-white/90",
  //   },
  //   links: {
  //     background: "bg-white/10 backdrop-blur-sm",
  //     text: "text-white",
  //     border: "border-white/20",
  //     hover: "hover:bg-white/20",
  //   },
  //   socialIcons: {
  //     background: "bg-white/10 backdrop-blur-sm",
  //     border: "border-white/20",
  //     iconColor: "text-white",
  //     hover: "hover:bg-white/20 hover:scale-110",
  //   },
  //   separator: "bg-white/20",
  // },

]
