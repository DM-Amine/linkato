// app/page.tsx
"use client";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import HowItWorks from "@/components/home/howItWorks"
import AudienceCard from "@/components/home/audience";
import { Faq } from "@/components/home/faq";
import Link from "next/link";

import CTA from "@/components/CTA";




export default function Home() {
  return (
    <main className=" ">
      {/* Hero */}
      <Hero/>

      {/* features */}
      <Features />


      {/* How It Works */}
      <HowItWorks  />

      <AudienceCard/>
     

     

      {/* Testimonials */}
      {/* <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 space-y-12 text-center">
          <h2 className="text-3xl font-bold">What Early Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Linkato gave me a sleek one-page hub for all my content without any clutter. My custom domain seals the deal.",
                author: "Alex Murillo, Freelance Designer",
              },
              {
                quote:
                  "Instant setup and zero branding made Linkato our go-to launch page for events.",
                author: "Priya Sen, Startup Co-founder",
              },
            ].map(({ quote, author }) => (
              <blockquote key={author} className="space-y-4">
                <p className="italic">“{quote}”</p>
                <footer className="text-sm font-medium">{author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ */}
      <Faq/>
   

      {/* Final CTA */}
      <section id="get-started" className="my-24 py-10 px-4 mx-auto bg-neutral-100 w-fit rounded-2xl border border-neutral-300">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold">Experience What +500 Users Already Love</h2>
          <CTA/>
        </div>
      </section>
    </main>
  );
}


// "use client";

// import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
// import { Faq } from "@/components/home/faq";
// // import { PresentationCarousel } from "@/components/home/presentation_carousel";
// import Hero from "@/components/home/hero";
// import Features from "@/components/home/features";
// import { FounderStory } from "@/components/home/founderStory";



// export default function Home() {
//   return (
//     <main className="min-h-screen ">
//       <Hero />
//       <Features/>
//       {/* <PresentationCarousel /> */}
//       <FounderStory />
//       <TestimonialsCarousel />
//       <Faq />
//     </main>
//   );
// }

