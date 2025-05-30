"use client"

import { useEffect } from "react";
export default function ComingSoon() {
      const dotPatternStyle = {
        backgroundImage: `radial-gradient(circle, var(--dot-color, rgba(0, 0, 0, 0.1)) 1px, transparent 1px)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0",
      };
    
      useEffect(() => {
        const updateDotColor = () => {
          const isDarkMode = document.documentElement.classList.contains("dark");
          document.documentElement.style.setProperty(
            "--dot-color",
            isDarkMode ? "#5E5E5E" : "#B8B8B8"
          );
        };
    
        updateDotColor();
        const observer = new MutationObserver(updateDotColor);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });
    
        return () => observer.disconnect();
      }, []);
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b  px-6" style={dotPatternStyle}>
      <div className="text-center space-y-6 animate-fade-up" style={{ animationDelay: "0.3s" }}>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-primary dark:text-d-primary">
          Coming Soon
        </h1>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 max-w-2xl mx-auto">
          Our blog isn&apos;t live yet—because we&apos;re building the foundation first. A content system that serves both our team and future customers, with no limits.
        </p>
        {/* <div className="mt-8">
          <span className="inline-block bg-primary dark:bg-d-primary text-white px-6 py-3 rounded-full text-sm font-semibold shadow hover:opacity-90 transition">
            Stay Tuned
          </span>
        </div> */}
      </div>
    </section>
  );
}
