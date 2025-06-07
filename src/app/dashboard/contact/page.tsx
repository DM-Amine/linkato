import ContactForm from '@/components/dashboard/FeedbackForm/FeedbackForm';


export default function ContactPage() {
    return (
       <div className="min-h-screen bg-background dark:bg-d-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text dark:text-dark-text mb-4">
            Feedback & Support
          </h1>
          <p className="text-sm text-secondaryText dark:text-dark-secondaryText max-w-2xl mx-auto">
            Have something to share? Whether it&apos;s a question, suggestion, or a bug you&apos;ve encountered, we&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.
          </p>
        </div>
        <div className="max-w-xl mx-auto">
          <ContactForm />
        </div>
      </div>
    </div>
    );
}
