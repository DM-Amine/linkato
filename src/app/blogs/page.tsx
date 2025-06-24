import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Linkato Blog – Creator Tools, Link-in-Bio Strategies & Growth Tips",
    description:
      "Discover strategies for personal branding, creator monetization, and link-in-bio best practices. Stay updated with Linkato’s latest features and growth tips.",
    keywords: [
      "Linkato blog",
      "link in bio strategies",
      "personal branding",
      "creator economy",
      "online presence tips",
      "bio link customization",
      "social media growth",
      "content marketing"
    ],
    openGraph: {
      title: "Linkato Blog – Creator Tools, Link-in-Bio Strategies & Growth Tips",
      description:
        "Explore Linkato’s insights on link-in-bio design, creator growth, monetization, and social media strategy.",
      url: "https://linkato.com/blogs",
      siteName: "Linkato",
      images: [
        {
          url: "https://linkato.com/og/linkato-blogs-cover.jpg", // update when image is ready
          width: 1200,
          height: 630,
          alt: "Linkato Blog – Link-in-Bio Growth and Creator Insights"
        }
      ],
      type: "website",
      locale: "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title: "Linkato Blog – Creator Tools, Link-in-Bio Strategies & Growth Tips",
      description:
        "Learn how to grow your online brand with Linkato. Insights on link-in-bio best practices and creator monetization.",
      images: ["https://linkato.com/og/linkato-blogs-cover.jpg"] // update accordingly
    }
  };
}



import dynamic from "next/dynamic";
const BlogsPageComponent = dynamic(() => import('@/components/blogs/blogs'));

export default function BlogsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogsPageComponent />
    </Suspense>
  );
}

// -- Coming Soon Placeholder --
// export default function BlogsPage() {
   
  
//   return (
//     <Suspense fallback={<div>Loading...</div>}>
//       <ComingSoon />
//     </Suspense>
//   );
// }
