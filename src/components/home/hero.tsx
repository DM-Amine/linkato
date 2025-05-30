import { WaitlistForm } from "@/components/waitlist-form/waitlist-form";

export default function Hero() {
  return (
    <section className="hero h-screen relative text-center px-4 flex-col justify-center items-center mx-auto py-12">
      <div className="my-12 text-neutral-800 dark:text-neutral-200">
        <h1 className="text-5xl font-bold">Join the Waitlist</h1>
        <p className="mt-4 text-lg font-medium max-w-2xl mx-auto">
          this page shows the waitlist component in action
        </p>
      </div>
      <WaitlistForm />
    </section>
  );
}
