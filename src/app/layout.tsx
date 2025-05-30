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
  title: "Dokweel Blogs Management App",
  description: "Organize your blogs with ease. Manage multiple blogs and projects efficiently with Dokweel.",
  keywords: [
    "Dokweel blogs management",
    "blog management app",
    "SaaS blogging tool",
    "organize blogs",
    "project management for blogs",
    "blogging tools",
    "content management system"
  ],
  openGraph: {
    title: "Dokweel Blogs Management App",
    description: "Organize your blogs with ease and efficiency.",
    url: "https://dokweel.com",
    siteName: "Dokweel",
    images: [
      {
        url: "https://dokweel.com/og/dokweel-blog-management.jpg", 
        width: 1200,
        height: 630,
        alt: "Dokweel Blog Management App"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Dokweel Blogs Management App",
    description: "Manage your blogs and projects with Dokweel – your easy-to-use blogging solution.",
    images: ["https://dokweel.com/og/dokweel-blog-management.jpg"] 
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
