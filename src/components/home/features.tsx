"use client";

import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChartNoAxesCombined ,
  MousePointerClick ,
  MoonStar ,
  PanelTop ,
  Frame ,
  RectangleEllipsis ,
  SquareDashedMousePointer ,
  Layers ,
} from "lucide-react";
import type { ReactNode } from "react";

gsap.registerPlugin(ScrollTrigger);

type FeatureItem = {
  title: string;
  description: string;
  icon?: ReactNode;
  size?: "small" | "medium" | "large";
  className?: string;
};

const features: FeatureItem[] = [
  { title: "Multi-Page", description: "Robust and secure API with full CRUD support.", icon: <PanelTop  className="h-6 w-6" />, size: "small" },
  { title: "No watermark", description: "Robust and secure API with full CRUD support.", icon: <Frame  className="h-6 w-6" />, size: "small" },
 
  { title: "Flexibility", description: "Add what you need without forcing", icon: <Layers  className="h-6 w-6" />, size: "small" },
  { title: "Instant Setup", description: "Receive your customers' messages, feedback, reports, and manage them with ease.", icon: <MousePointerClick  className="h-6 w-6" />, size: "small" },
  { title: "themes", description: "Premium themes built to boost conversion rate with light and dark mode.", icon: <MoonStar   className="h-6 w-6" />, size: "small" },
 
  { title: "Custom forms (soon)", description: "Fine-grained content control through URL-based filters, including search, tags, and pagination.", icon: <RectangleEllipsis  className="h-6 w-6" />, size: "small" },
  { title: "Custom CTA (soon)", description: "Fine-grained content control through URL-based filters, including search, tags, and pagination.", icon: <SquareDashedMousePointer  className="h-6 w-6" />, size: "small" },
  
  { title: "Analytics (soon)", description: "Fine-grained content control through URL-based filters, including search, tags, and pagination.", icon: <ChartNoAxesCombined  className="h-6 w-6" />, size: "small" },
  // { title: "SEO (Search Engine Optimization)", description: "Optimized for search engines with both static and dynamic SEO features.", icon: <Search className="h-6 w-6" />, size: "medium" },
  // { title: "Seamless Authentication", description: "Integrated Google OAuth via NextAuth for quick and secure onboarding.", icon: <LogIn className="h-6 w-6" />, size: "medium" },
  // { title: "Modern UI/UX", description: "Crafted with shadcn/ui and Tailwind CSS for a sleek and professional interface.", icon: <Palette className="h-6 w-6" />, size: "medium" },
  // { title: "Role-Based Access", description: "Built-in support for user, admin, and moderator roles with secure access control.", icon: <UserCheck className="h-6 w-6" />, size: "small" },
  // { title: "Theming Support", description: "Effortlessly toggle between light and dark modes for an adaptive user experience.", icon: <Moon className="h-6 w-6" />, size: "small" },
];

const sizeToClass = {
  small: "col-span-1 row-span-1",
  medium: "col-span-1 md:col-span-2 row-span-1",
  large: "col-span-1 md:col-span-2 row-span-2",
};

export default function Features({ id }: { id?: string }) {
  const containerRef = useRef(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

useLayoutEffect(() => {
  const isDesktop = typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

  if (!isDesktop || !containerRef.current) return;

  gsap.fromTo(
    cardRefs.current,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    }
  );
}, []);


  return (
    <section
    id={id}
      className="container min-h-[60vh] relative z-10 mx-auto px-4 py-12"
      ref={containerRef}
    >
      {/* <div className="pointer-events-none absolute top-0 left-0 w-full -translate-y-1/2 z-10">
        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        <div className="absolute left-0 top-1/2 h-[5px] w-full bg-gradient-to-r from-transparent via-primary to-transparent blur-sm" />
        <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent" />
      </div> */}

      <div className="grid auto-rows-min grid-cols-1 gap-4 md:grid-cols-4 md:gap-6">
        {features.map((feature, index) => {
          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
             ref={(el) => {
                cardRefs.current[index] = el;
              }}

              className={`group relative overflow-hidden rounded-2xl border border-neutral-400 
                bg-neutral-200/80 p-3 backdrop-blur-sm transition-all duration-500 ease-out
                dark:border-neutral-100 dark:bg-neutral-900/80
                dark:[border:1px_solid_rgba(255,255,255,.1)] 
               
                [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]
                hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
                dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]
                ${sizeToClass[feature.size || "small"]} ${feature.className || ""}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* <div className="absolute inset-0 bg-gradient-to-br from-primary/1 via-primary/10 to-neutral-100 dark:to-neutral-900 dark:opacity-30 opacity-100 group-hover:opacity-0 transition-opacity duration-700" /> */}
              <div className="absolute inset-0 bg-white/5 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-900" />
              <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary-light/5 dark:from-primary/10 dark:to-d-primary-light/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              {/* <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-br from-neutral-900/20 to-primary-light/5 dark:from-amber/10 dark:to-d-primary-light/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" /> */}

              <div className="relative z-10 flex h-full flex-col">
                <div className="relative mb-4">
                  <div className="absolute inset-0 scale-75 rounded-xl bg-gradient-to-br from-primary/20 to-primary-light/10 dark:from-primary/30 dark:to-d-primary-light/20 blur-md opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700" />
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-xl 
                      bg-gradient-to-br from-primary-light/30 to-primary/20 
                      dark:from-d-primary-light/40 dark:to-primary/30 
                      text-primary dark:text-primary-light shadow-sm group-hover:shadow-md transition-all duration-300 ${
                        isHovered ? "animate-pulse" : ""
                      }`}
                  >
                    {feature.icon}
                  </div>
                </div>

                <div className="relative">
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                    {feature.title}
                  </h3>
                  <div className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-primary to-primary-light/70 dark:from-primary dark:to-d-primary-light/70 group-hover:w-16 transition-all duration-300 ease-out" />
                </div>

                <p className="mt-2 flex-grow text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
