"use client";

import { TestimonialsCarousel } from "@/components/home/testimonials-carousel";
import { Faq } from "@/components/home/faq";
// import { PresentationCarousel } from "@/components/home/presentation_carousel";
import Hero from "@/components/home/hero";
import Features from "@/components/home/features";
import { FounderStory } from "@/components/home/founderStory";



export default function Home() {
  return (
    <main className="min-h-screen ">
      <Hero />
      <Features/>
      {/* <PresentationCarousel /> */}
      <FounderStory />
      <TestimonialsCarousel />
      <Faq />
    </main>
  );
}

