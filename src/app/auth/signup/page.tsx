import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Sign Up for Linkato – Start Managing Your Blogs Today",
    description:
      "Create a free account on Linkato and begin managing your blogs, projects, and collaborate with your team easily. Get started now and grow your content.",
    keywords: [
      "Linkato signup",
      "create account",
      "start blogging",
      "blog management platform",
      "SaaS signup",
      "content management system signup",
      "join Linkato",
    ],
    openGraph: {
      title: "Sign Up for Linkato – Start Managing Your Blogs Today",
      description:
        "Sign up for Linkato and unlock the power of easy blog management, project collaboration, and innovative blogging tools.",
      url: "https://Linkato.com/signup",
      siteName: "Linkato",
      images: [
        {
          url: "https://Linkato.com/og/signup-cover.jpg", // Replace with your actual image URL
          width: 1200,
          height: 630,
          alt: "Linkato Signup Page Image"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Sign Up for Linkato – Start Managing Your Blogs Today",
      description:
        "Join the Linkato platform today! Start managing your blogs, collaborating with your team, and building content effortlessly.",
      images: ["https://Linkato.com/og/signup-cover.jpg"] // Replace with your actual image URL
    }
  };
};

export { default } from "./signup";
