import { Suspense } from "react";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Lunitea Blogs – AI, Tech, Design & Growth for SaaS Teams",
    description:
      "Explore future-focused content on SaaS startups, AI tools, modern product design, and web development – curated by Lunitea.",
    keywords: [
      "Lunitea blog",
      "SaaS blog posts",
      "startup growth",
      "AI product design",
      "web development blogs",
      "tech founder insights",
      "UI/UX strategy",
      "modern SaaS trends"
    ],
    openGraph: {
      title: "Lunitea Blogs – AI, Tech, Design & Growth for SaaS Teams",
      description:
        "Explore expert articles on SaaS, startups, AI tools, and web development curated by the Lunitea team.",
      url: "https://lunitea.com/blogs",
      siteName: "Lunitea",
      images: [
        {
          url: "https://lunitea.com/og/lunitea-blogs-cover.jpg",
          width: 1200,
          height: 630,
          alt: "Discover SaaS, AI, and design insights on the Lunitea blog"
        }
      ],
      type: "website",
      locale: "en_US"
    },
    twitter: {
      card: "summary_large_image",
      title: "Lunitea Blogs – AI, Tech, Design & Growth for SaaS Teams",
      description:
        "Future-focused blogs on SaaS, AI, product design, and modern tech workflows – brought to you by Lunitea.",
      images: ["https://lunitea.com/og/lunitea-blogs-cover.jpg"]
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
