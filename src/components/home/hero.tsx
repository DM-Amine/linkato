import CTA from "@/components/CTA";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full  flex justify-center items-center px-4">
      <div className="flex flex-col items-center justify-center text-center py-24 max-w-5xl">
        <div className="space-y-4">
          <h1 className="text-neutral-700 dark:text-neutral-300 text-4xl md:text-5xl font-bold leading-tight">
            Your Page. Your Brand. Simple and Clean.
          </h1>
          <p className="text-neutral-600 max-w-3xl mx-auto dark:text-neutral-300 text-lg md:text-xl">
            Create multiple, high conversion minimal pages. No watermark, no complexity, instant setup with flexibility.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 items-center justify-center">
            <CTA />
          </div>
        </div>
        <div className="mt-8 ">
          <Image
            src="/images/screenshots/Screenshot 2025-06-11 163752.png"
            alt="linkato"
            width={800}
            height={600}
            className="bg-neutral-400 dark:bg-neutral-800 rounded-lg w-full max-w-[800px] h-auto"
          />
        </div>
      </div>
    </section>
  );
}
