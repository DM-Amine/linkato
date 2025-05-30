import { WaitlistForm } from "@/components/waitlist-form/waitlist-form";




export default function WaitlistPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full my-34 ">
      <div className="flex flex-col items-center justify-center w-full max-w-2xl p-4">
        <h1 className="text-3xl font-bold text-center">Join the Waitlist</h1>
        <p className="my-4 text-lg text-center">
          this page shows the waitlist component in action
        </p>
        <WaitlistForm />
      </div>
    </div>
  );
}