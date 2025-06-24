import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Linkato Roadmap – See What’s Coming Next",
    description:
      "Stay updated with Linkato’s product roadmap. Discover upcoming features, improvements, and innovations we’re working on for bloggers and SaaS creators.",
    keywords: [
      "Linkato roadmap",
      "feature updates",
      "upcoming features",
      "future plans",
      "SaaS development roadmap",
      "product updates",
      "Linkato progress",
    ],
    openGraph: {
      title: "Linkato Roadmap – See What’s Coming Next",
      description:
        "Explore Linkato’s future vision. Our roadmap showcases the features and enhancements coming your way to improve content management and collaboration.",
      url: "https://Linkato.com/roadmap",
      siteName: "Linkato",
      images: [
        {
          url: "https://Linkato.com/og/roadmap-cover.jpg", // Replace with actual OG image
          width: 1200,
          height: 630,
          alt: "Linkato Roadmap Cover Image"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Linkato Roadmap – See What’s Coming Next",
      description:
        "Take a look at what we’re building next at Linkato. Follow our progress and help shape the future of our blog management tools.",
      images: ["https://Linkato.com/og/roadmap-cover.jpg"] // Replace with actual image
    }
  };
};

export { default } from "./roadmap";
