import ContactForm from '@/components/contact/ContactForm';
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Contact Us | Linkato – We're Here to Help",
    description:
      "Have questions or feedback about Linkato? Reach out to our team for support, partnership inquiries, or general assistance.",
    keywords: [
      "contact Linkato",
      "Linkato support",
      "get in touch Linkato",
      "creator support",
      "bio link help",
      "contact form",
      "Linkato team"
    ],
    openGraph: {
      title: "Contact Us | Linkato – We're Here to Help",
      description:
        "Need help or have a question? Contact the Linkato team for support or collaboration opportunities.",
      url: "https://linkato.vercel.app/contact",
      siteName: "Linkato",
      images: [
        {
          url: "https://linkato.vercel.app/og/contact-cover.jpg", // Update with your actual contact OG image
          width: 1200,
          height: 630,
          alt: "Contact Linkato – Get Support or Say Hello"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Linkato – We're Here to Help",
      description:
        "Reach out to the Linkato team for assistance, feedback, or partnership inquiries. We're here for you.",
      images: ["https://linkato.vercel.app/og/contact-cover.jpg"] // Same as OG
    }
  };
};



export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background dark:bg-d-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-text dark:text-dark-text mb-4">Contact Us</h1>
                    <p className="text-lg text-secondaryText dark:text-dark-secondaryText max-w-2xl mx-auto">
                        Have a question or want to get in touch? Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </p>
                </div>
                <div className="max-w-xl mx-auto">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
