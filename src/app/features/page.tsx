import { Suspense } from "react";
import dynamic from "next/dynamic";
// import type { Metadata } from "next";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Powerful Features for Modern Blogging | Dokweel",
//     description:
//       "Explore Dokweel’s core features for seamless blogging, real-time collaboration, SEO optimization, and community building. Built for modern creators and SaaS teams.",
//     keywords: [
//       "Dokweel features",
//       "SaaS blogging tools",
//       "real-time blog editor",
//       "blogging for startups",
//       "collaborative writing",
//       "SEO-friendly blogging",
//       "Dokweel platform",
//       "AI-powered blogging features"
//     ],
//     openGraph: {
//       title: "Powerful Features for Modern Blogging | Dokweel",
//       description:
//         "From real-time editing to SEO-ready exports and collaborative tools, see why Dokweel is the go-to platform for startups and creators.",
//       url: "https://dokweel.com/features",
//       siteName: "Dokweel",
//       images: [
//         {
//           url: "https://dokweel.com/og/features-cover.jpg", // Replace with your actual OG image
//           width: 1200,
//           height: 630,
//           alt: "Dokweel Features Preview"
//         }
//       ],
//       type: "website"
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "Powerful Features for Modern Blogging | Dokweel",
//       description:
//         "Experience advanced tools for SaaS blogging, team collaboration, and SEO in one modern platform. Learn more about Dokweel.",
//       images: ["https://dokweel.com/og/features-cover.jpg"]
//     }
//   };
// }

// Dynamically import the component that uses `useSearchParams`
const FeaturesPageComponent = dynamic(() => import('@/components/features/features'));

export default function FeaturesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeaturesPageComponent />
    </Suspense>
  ); 
}
