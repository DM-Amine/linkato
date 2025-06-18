// app/page.tsx
"use client";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/howItWorks"
import AudienceCard from "@/components/home/audience";
import { Faq } from "@/components/home/faq";


import CTA from "@/components/CTA";




export default function Home() {
  return (
    <main className=" ">
      {/* Hero */}
      <Hero/>

      {/* features */}
    {/* Features Section */}
<section id="features">
  <Features />
</section>



      {/* How It Works */}
      <HowItWorks  />

    {/* Audience */}
      <AudienceCard/>


      {/* FAQ */}
      <Faq/>
   
      {/* Final CTA */}
      <section id="get-started" className="my-24 py-10 px-4 mx-auto ring-10 shadow-2xl  ring-neutral-300 bg-neutral-100/80 dark:ring-neutral-900/80 dark:bg-neutral-900 w-fit rounded-4xl border-6 border-primary/40 dark:border-primary/80">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Join 200+ Early Access Users Who Love the Experience (actually i have no one)</h2>
         <div className="h-fit w-fit mx-auto hover:scale-110 transition-all duration-300">
           <CTA/>
         </div>
        </div>
      </section>
    </main>
  );
}



