import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Dokweel Roadmap – See What’s Coming Next",
    description:
      "Stay updated with Dokweel’s product roadmap. Discover upcoming features, improvements, and innovations we’re working on for bloggers and SaaS creators.",
    keywords: [
      "Dokweel roadmap",
      "feature updates",
      "upcoming features",
      "future plans",
      "SaaS development roadmap",
      "product updates",
      "Dokweel progress",
    ],
    openGraph: {
      title: "Dokweel Roadmap – See What’s Coming Next",
      description:
        "Explore Dokweel’s future vision. Our roadmap showcases the features and enhancements coming your way to improve content management and collaboration.",
      url: "https://dokweel.com/roadmap",
      siteName: "Dokweel",
      images: [
        {
          url: "https://dokweel.com/og/roadmap-cover.jpg", // Replace with actual OG image
          width: 1200,
          height: 630,
          alt: "Dokweel Roadmap Cover Image"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Dokweel Roadmap – See What’s Coming Next",
      description:
        "Take a look at what we’re building next at Dokweel. Follow our progress and help shape the future of our blog management tools.",
      images: ["https://dokweel.com/og/roadmap-cover.jpg"] // Replace with actual image
    }
  };
};

export { default } from "./roadmap";
