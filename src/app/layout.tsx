import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react'
import { Poppins } from "next/font/google";
import { Theme_Provider } from "@/components/theme-provider/theme-provider";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from 'sonner';
import NavbarMain from "@/components/navbar-main/navbar-main";
import Footer from "@/components/footer/footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-poppins", 
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linkato – Build Your Link-in-Bio Page",
  description:
    "Create a professional link-in-bio page with Linkato. Showcase your links, social profiles, and content with fully customizable themes.",
  keywords: [
    "Linkato",
    "link in bio tool",
    "linktree alternative",
    "customizable bio link",
    "social media links",
    "personal branding",
    "creator tools",
    "link management",
    "SaaS bio link builder"
  ],
  openGraph: {
    title: "Linkato – Build Your Link-in-Bio Page",
    description:
      "Linkato lets you create sleek, professional link-in-bio pages with full customization and mobile-friendly previews.",
    url: "https://linkato.vercel.app",
    siteName: "Linkato",
    images: [
      {
        url: "https://linkato.vercel.app/images/linkato-link-in-bio.jpg", // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Linkato – Your Custom Bio Link Page"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Linkato – Build Your Link-in-Bio Page",
    description:
      "Customize your online presence with Linkato. Create powerful link-in-bio pages with themes, avatars, and more.",
    images: ["https://linkato.vercel.app/images/linkato-link-in-bio.jpg"] // Replace with your actual image
  }
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning >
    
  <body
    className={`${poppins.variable} antialiased bg-neutral-200 dark:bg-neutral-950 flex flex-col min-h-screen`}
  >
    <AuthProvider>
      <Theme_Provider>
        <NavbarMain />
        <main className="flex-grow">{children}
        <Analytics />
        <Toaster richColors />
        </main>
        <Footer />
      </Theme_Provider> 
    </AuthProvider>
  </body>


    </html>
  );
}
