import { Background } from "@tsparticles/engine"
import type { Theme } from "../types"

export const themes: Theme[] = [
  // FREE THEMES
  {
    id: "minimal-light",
    name: "Minimal Light",
    isPro: false,
    preview: "#F8F8F8",
    background: "bg-neutral-50",
    avatar: {
      border: "border-neutral-200",
      size: "w-20 h-20",
    },
    text: {
      name: "text-neutral-800",
      bio: "text-neutral-600",
    },
    socialIcons: {
      background: "bg-white",
      border: "border-neutral-200",
      iconColor: "platform-color", 
      hover: "hover:bg-neutral-50 hover:scale-110",
    },
    links: {
      background: "bg-white",
      text: "text-neutral-800",
      border: "border-neutral-200",
      hover: "hover:bg-neutral-50",
    },
    watermark:{
      background: "bg-white",
      text: "text-neutral-800",
    }

   
  },
  {
    id: "minimal-dark",
    name: "Minimal Dark",
    isPro: false,
    preview: "#1A1A1A",
    background: "bg-neutral-900",
    profile_card:{
      position : "-mt-24",
      Background : "bg-neutral-900"
    },
    cover_image : {
      size : "sm:w-9/12 w-full",
      shadow: "shadow-lg",
      corners : "rounded-lg",
    },
    avatar: {
      
      border: "border-neutral-900 border-4",
      corners : "rounded-full",
      size: "w-24 h-24",
    },
    text: {
      name: "text-white",
      bio: "text-neutral-300",
    },
    links: {
      background: "bg-neutral-800",
      text: "text-white",
      border: "border-neutral-700",
      hover: "hover:bg-neutral-700",
    },
    socialIcons: {
      background: "bg-neutral-800",
      border: "border-neutral-700",
      iconColor: "text-white",
      hover: "hover:bg-neutral-700 hover:scale-110",
    },
        watermark:{
      background: "bg-neutral-800",
      text: "text-neutral-200",
    },
    separator: {
      size: "sm:w-9/12 w-full ",
      background : "bg-neutral-700",
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

  // // PRO THEMES
  // {
  //   id: "gradient-sunset",
  //   name: "Gradient Sunset",
  //   isPro: true,
  //   preview: "linear-gradient(135deg, #ff6b6b, #ffa726)",
  //   background: "bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400",
  //   coverOverlay: "bg-gradient-to-t from-black/40 to-transparent",
  //   avatar: {
  //     border: "border-white ring-4 ring-white/30",
  //     size: "w-24 h-24",
  //   },
  //   text: {
  //     name: "text-white font-bold",
  //     bio: "text-white/95",
  //   },
  //   links: {
  //     background: "bg-white/15 backdrop-blur-md",
  //     text: "text-white font-medium",
  //     border: "border-white/30",
  //     hover: "hover:bg-white/25 hover:scale-105 transition-all duration-200",
  //   },
  //   socialIcons: {
  //     background: "bg-white/15 backdrop-blur-md",
  //     border: "border-white/30",
  //     iconColor: "text-white",
  //     hover: "hover:bg-white/25 hover:scale-125 hover:shadow-lg transition-all duration-200",
  //   },
  //   separator: "bg-white/30",
  // },
  // {
  //   id: "neon-cyber",
  //   name: "Neon Cyber",
  //   isPro: true,
  //   preview: "linear-gradient(135deg, #0f0f23, #2d1b69)",
  //   background: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
  //   coverOverlay: "bg-gradient-to-t from-purple-900/60 to-transparent",
  //   avatar: {
  //     border: "border-cyan-400 ring-4 ring-cyan-400/30 shadow-lg shadow-cyan-400/50",
  //     size: "w-24 h-24",
  //   },
  //   text: {
  //     name: "text-cyan-300 font-bold",
  //     bio: "text-cyan-100/90",
  //   },
  //   links: {
  //     background: "bg-cyan-400/10 backdrop-blur-md border-cyan-400/30",
  //     text: "text-cyan-300 font-medium",
  //     border: "border-cyan-400/30",
  //     hover:
  //       "hover:bg-cyan-400/20 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300",
  //   },
  //   socialIcons: {
  //     background: "bg-cyan-400/10 backdrop-blur-md",
  //     border: "border-cyan-400/30",
  //     iconColor: "text-cyan-300",
  //     hover:
  //       "hover:bg-cyan-400/20 hover:scale-125 hover:shadow-lg hover:shadow-cyan-400/25 transition-all duration-300",
  //   },
  //   separator: "bg-cyan-400/30",
  // },
  // {
  //   id: "ocean-depths",
  //   name: "Ocean Depths",
  //   isPro: true,
  //   preview: "linear-gradient(135deg, #667eea, #764ba2)",
  //   background: "bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800",
  //   coverOverlay: "bg-gradient-to-t from-indigo-900/50 to-transparent",
  //   avatar: {
  //     border: "border-blue-200 ring-4 ring-blue-200/40",
  //     size: "w-24 h-24",
  //   },
  //   text: {
  //     name: "text-blue-100 font-bold",
  //     bio: "text-blue-200/90",
  //   },
  //   links: {
  //     background: "bg-blue-500/20 backdrop-blur-md",
  //     text: "text-blue-100 font-medium",
  //     border: "border-blue-300/30",
  //     hover: "hover:bg-blue-500/30 hover:border-blue-300/50 transition-all duration-200",
  //   },
  //   socialIcons: {
  //     background: "bg-blue-500/20 backdrop-blur-md",
  //     border: "border-blue-300/30",
  //     iconColor: "text-blue-100",
  //     hover: "hover:bg-blue-500/30 hover:scale-125 transition-all duration-200",
  //   },
  //   separator: "bg-blue-300/30",
  // },
  // {
  //   id: "forest-mystique",
  //   name: "Forest Mystique",
  //   isPro: true,
  //   preview: "linear-gradient(135deg, #134e5e, #71b280)",
  //   background: "bg-gradient-to-br from-emerald-800 via-green-700 to-teal-800",
  //   coverOverlay: "bg-gradient-to-t from-emerald-900/50 to-transparent",
  //   avatar: {
  //     border: "border-emerald-200 ring-4 ring-emerald-200/40",
  //     size: "w-24 h-24",
  //   },
  //   text: {
  //     name: "text-emerald-100 font-bold",
  //     bio: "text-emerald-200/90",
  //   },
  //   links: {
  //     background: "bg-emerald-500/20 backdrop-blur-md",
  //     text: "text-emerald-100 font-medium",
  //     border: "border-emerald-300/30",
  //     hover: "hover:bg-emerald-500/30 hover:border-emerald-300/50 transition-all duration-200",
  //   },
  //   socialIcons: {
  //     background: "bg-emerald-500/20 backdrop-blur-md",
  //     border: "border-emerald-300/30",
  //     iconColor: "text-emerald-100",
  //     hover: "hover:bg-emerald-500/30 hover:scale-125 transition-all duration-200",
  //   },
  //   separator: "bg-emerald-300/30",
  // },
  // {
  //   id: "royal-purple",
  //   name: "Royal Purple",
  //   isPro: true,
  //   preview: "linear-gradient(135deg, #667eea, #764ba2)",
  //   background: "bg-gradient-to-br from-purple-700 via-violet-700 to-purple-900",
  //   coverOverlay: "bg-gradient-to-t from-purple-900/60 to-transparent",
  //   avatar: {
  //     border: "border-purple-200 ring-4 ring-purple-200/40 shadow-lg shadow-purple-500/30",
  //     size: "w-24 h-24",
  //   },
  //   text: {
  //     name: "text-purple-100 font-bold",
  //     bio: "text-purple-200/90",
  //   },
  //   links: {
  //     background: "bg-purple-500/20 backdrop-blur-md",
  //     text: "text-purple-100 font-medium",
  //     border: "border-purple-300/30",
  //     hover:
  //       "hover:bg-purple-500/30 hover:border-purple-300/50 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-200",
  //   },
  //   socialIcons: {
  //     background: "bg-purple-500/20 backdrop-blur-md",
  //     border: "border-purple-300/30",
  //     iconColor: "text-purple-100",
  //     hover:
  //       "hover:bg-purple-500/30 hover:scale-125 hover:shadow-md hover:shadow-purple-500/20 transition-all duration-200",
  //   },
  //   separator: "bg-purple-300/30",
  // },
  // {
  //   id: "golden-luxury",
  //   name: "Golden Luxury",
  //   isPro: true,
  //   preview: "linear-gradient(135deg, #f7971e, #ffd200)",
  //   background: "bg-gradient-to-br from-yellow-600 via-orange-500 to-red-500",
  //   coverOverlay: "bg-gradient-to-t from-orange-900/50 to-transparent",
  //   avatar: {
  //     border: "border-yellow-200 ring-4 ring-yellow-200/50 shadow-lg shadow-yellow-500/30",
  //     size: "w-24 h-24",
  //   },
  //   text: {
  //     name: "text-yellow-100 font-bold",
  //     bio: "text-yellow-200/90",
  //   },
  //   links: {
  //     background: "bg-yellow-500/20 backdrop-blur-md",
  //     text: "text-yellow-100 font-medium",
  //     border: "border-yellow-300/40",
  //     hover:
  //       "hover:bg-yellow-500/30 hover:border-yellow-300/60 hover:shadow-md hover:shadow-yellow-500/20 transition-all duration-200",
  //   }, 
  //   socialIcons: {
  //     background: "bg-yellow-500/20 backdrop-blur-md",
  //     border: "border-yellow-300/40",
  //     iconColor: "text-yellow-100",
  //     hover:
  //       "hover:bg-yellow-500/30 hover:scale-125 hover:shadow-md hover:shadow-yellow-500/20 transition-all duration-200",
  //   },
  //   separator: "bg-yellow-300/40",
  // },
]
