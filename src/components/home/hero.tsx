
import CTA from "@/components/CTA";
import Image from "next/image";
export default function Hero() {
  return (

          
      <section className="min-w-full flex justify-center items-center mt-34">
        <div className=" flex flex-col items-center justify-center">
          <div className="space-y-2 flex flex-col items-center justify-center">
            <h1 className="text-neutral-700 dark:text-neutral-300 text-4xl md:text-5xl font-bold leading-tight">
              Your Page. Your Brand. Simple and Clean.
            </h1>
            <p className="   text-neutral-600 text-lg dark:text-neutral-300">
              Create multiple, high conversion minimal pages no watermark, no complexity, instant setup with flexibility.
            </p>
            <div className="flex space-x-4"> 
              <CTA/>
             
            </div>
          </div>
          <div className=" mt-6">
            {/* Replace with your actual mockup */}
            <Image src="/images/screenshots/Screenshot 2025-06-11 163752.png" alt="linkato" width={800} height={600}  className=" bg-neutral-400 dark:bg-neutral-800 rounded-lg"/>
          </div>
        </div>
      </section>
   
  );
}
