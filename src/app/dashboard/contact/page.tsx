import ContactForm from '@/components/dashboard/FeedbackForm/FeedbackForm';
import type { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  return {
    title: "Contact Us | Dokweel – Reach Out to Us Today",
    description:
      "Get in touch with the Dokweel team for any questions, inquiries, or support. We’re here to assist you with your SaaS and blogging needs.",
    keywords: [
      "contact us Dokweel",
      "get in touch with Dokweel",
      "SaaS support",
      "contact form",
      "reach out to Dokweel",
      "Dokweel customer support"
    ],
    openGraph: {
      title: "Contact Us | Dokweel – Reach Out to Us Today",
      description:
        "Have questions or need support? Contact Dokweel and get personalized help with our products and services.",
      url: "https://dokweel.com/contact",
      siteName: "Dokweel",
      images: [
        {
          url: "https://dokweel.com/og/contact-cover.jpg", // Add the appropriate image URL for the contact page
          width: 1200,
          height: 630,
          alt: "Contact Us - Dokweel"
        }
      ],
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us | Dokweel – Reach Out to Us Today",
      description:
        "Get in touch with the Dokweel team for any inquiries or support, and we will assist you as quickly as possible.",
      images: ["https://dokweel.com/og/contact-cover.jpg"] // Same as Open Graph image
    }
  };
};


export default function ContactPage() {
    return (
       <div className="min-h-screen bg-background dark:bg-d-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text dark:text-dark-text mb-4">
            Feedback & Support
          </h1>
          <p className="text-sm text-secondaryText dark:text-dark-secondaryText max-w-2xl mx-auto">
            Have something to share? Whether it's a question, suggestion, or a bug you’ve encountered, we’d love to hear from you. Fill out the form below and we’ll get back to you as soon as possible.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
    );
}
