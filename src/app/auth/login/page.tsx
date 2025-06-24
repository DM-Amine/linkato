import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Login to Linkato – Secure Access to Your Blogging Dashboard",
    description:
      "Log in to your Linkato account and manage your blogs, projects, and team collaboration with ease. Get started with seamless access.",
    keywords: [
      "Linkato login",
      "secure login",
      "blogging dashboard",
      "manage blogs",
      "login to Linkato",
      "SaaS login",
      "content management system login",
    ],
    openGraph: {
      title: "Login to Linkato – Secure Access to Your Blogging Dashboard",
      description:
        "Log in to your Linkato account and take control of your blogs and projects. Manage everything with ease and security.",
      url: "https://Linkato.com/login",
      siteName: "Linkato",
      images: [
        {
          url: "https://Linkato.com/og/login-cover.jpg", // Replace with your actual image URL
          width: 1200,
          height: 630,
          alt: "Linkato Login Page Image"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Login to Linkato – Secure Access to Your Blogging Dashboard",
      description:
        "Easily log in to your Linkato account and access all your blog projects with security and convenience.",
      images: ["https://Linkato.com/og/login-cover.jpg"] // Replace with your actual image URL
    }
  };
};

export { default } from "./login"; 