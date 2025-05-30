"use client";

import ImageGallery from "@/components/home/imageGallery";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  Globe,
  StickyNote,
  BriefcaseBusiness,
  // ShieldCheck,
} from "lucide-react";

gsap.registerPlugin(ScrollToPlugin);

const tabs = [
  {
    id: "1",
    label: "Public",
    title: "Public Pages",
    description: `marketing pages, content hub, and conversion tools. Pre-styled layouts work immediately but adapt to your brand, while protected actions like form submissions ensure security. Everything visitors need to discover, trust, and engage.`,
    auth: `<strong>All pages</strong> are public, no account is needed. <strong>All APIs</strong> are protected, except for <strong>waitlist</strong>, <strong>contact</strong>, and <strong>signup</strong>, which allow <strong>POST</strong> requests only.`,

    icon: <Globe size={18} className="m-0.5" />,
    features: [
      "Home & witlist component, (checking email if already in before submitting 'the link in the footer')",
      "Features page (Search, Filter, Pagination)",
      "Blogs page (Search, Filter, Pagination)",
      "Single Blog page (modern design with custom CSS style for all HTML tags)",
      "Static & Dynamic SEO",
      "URL Filtering, search & Pagination",
      "Other Pages: Roadmap Page, Contact, Pricing, Terms & Conditions, Privacy Policy, Custom 404 Error, waitlist 'thank you' page",
      "Auth Pages: Signup, Login, Error, Access Denied",
    ],
    image:
      "/images/presentation/original-8c532039f7c18c3a1afc340462aeefd5.webp",
  },
  {
    id: "2",
    label: "Application",
    title: "User Dashboard",
    description: `the app side where user can use the app, services, and manage their account.
    Authentication: all pages are in dashboard route are protected, can access by the users that logged in or  high user role (admin/moderator)
    `,
    auth: "<strong>All pages and APIs</strong> under the dashboard route are protected. Accessible only by users who are <strong>logged in</strong> or have a <strong>higher user role</strong> (Admin/Moderator).",
    icon: <LayoutDashboard size={18} className="m-0.5" />,

    features: [
      "user profile, where can see and update their info",
      "neccesary componenets: navbar, user card, sidebar",
    ],
    image:
      "/images/presentation/original-ed6f1f796306f9e27a6a3e99a88ba26d.webp",
  },
  {
    id: "3",
    label: "Business",
    title: "Admine Panel",
    description: `the business side where owners can manage the app, users, contact, and waitlist.
    `,
    auth: "<strong>All pages and APIs</strong> are protected and can only be accessed by users with a <strong>high-level role</strong> (Admin/Moderator).",

    icon: <BriefcaseBusiness size={18} className="m-0.5" />,
    features: [
      "User management (Add, Update, Delete, Export CSV, Search by name, email, plan...etc, Filter users)",
      "Waitlist (Search, Export CSV, UTM tracking)",
      "Waitlist insights without 3rd party (users data: browser, device, os, language | top countries | growth chart)",
      "Contact (View, delete single or mutliple, Filter, multiple select, Search, Export CSV)",
      "All Export CSV export the data that you need based on filtering",
    ],
    image: "/images/screenshots/dashboard/localhost_3000_dashboard (2).png",
  },
];

export const PresentationCarousel = () => {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("1");
  const [isScrolling, setIsScrolling] = useState(false);
  const [inView, setInView] = useState(false);

  

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (isScrolling || activeTab === sectionId) return;

      const target = sectionRefs.current[sectionId];
      if (!target) return;

      setIsScrolling(true);

      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: target,
          offsetY: 0,
        },
        ease: "power2.inOut",
        onComplete: () => {
          setActiveTab(sectionId);
          setTimeout(() => setIsScrolling(false), 600);
        },
      });
    },
    [isScrolling, activeTab]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!tabsRef.current || isScrolling || !inView) return;

      const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
      const direction = e.deltaY > 0 ? 1 : -1;
      const nextIndex = currentIndex + direction;

      if (
        (currentIndex === 0 && direction < 0) ||
        (currentIndex === tabs.length - 1 && direction > 0)
      ) {
        return;
      }

      e.preventDefault();
      scrollToSection(tabs[nextIndex].id);
    },
    [activeTab, isScrolling, inView, scrollToSection]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  useEffect(() => {
    const onScroll = () => {
      if (!tabsRef.current) return;
      const rect = tabsRef.current.getBoundingClientRect();
      setInView(rect.top <= 0 && rect.bottom > 0);
    };

    onScroll(); // Check on load
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleActiveTabOnScroll = () => {
      if (isScrolling) return;

      const entries = Object.entries(sectionRefs.current);
      for (const [id, el] of entries) {
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        const isVisible =
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2;

        if (isVisible) {
          if (activeTab !== id) {
            setActiveTab(id);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleActiveTabOnScroll);
    return () => window.removeEventListener("scroll", handleActiveTabOnScroll);
  }, [activeTab, isScrolling]);

  // dot patterns
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
    <section>
      <div className="flex justify-center items-center max-w-7xl mx-auto px-4 pt-12  ">
          <div className="flex flex-col text-center justify-center items-center  ">
           <h2 className="text-4xl font-bold tracking-tight mb-2">
   Three Pillars of a Complete Application
  </h2>
  <p className="text-md leading-5  max-w-2xl mx-auto">
  Lunitea provides more than essentials for your business:
    A conversion-focused public website, an engaging user dashboard,
    and a management portal - all seamlessly integrated and ready to scale.

  </p>
            <h1 className="mt-14 text-lg px-4 py-1 border-2 font-semibold border-primary-light  dark:border-d-primary-light/1 bg-gradient-to-b from-primary/85  to-primary/65 text-neutral-50  shadow-primary/40 max-w-fit rounded-2xl shadow-lg">Core Environments</h1>
          <Image src="/icons/beams.svg" width={400} height={400} alt="beam" className=" w-[320px]" />
          
          </div>
         </div>
      {/* Sticky Tabs */}
      <div ref={tabsRef} className="sticky top-0 z-50  ">
        <div className="w-full flex justify-center overflow-x-auto no-scrollbar bg-neutral-50/20 dark:bg-neutral-700/20 backdrop-blur-xs">
          <div className="container max-w-[98%] flex backdrop-blur-lg bg-neutral-700/20 dark:bg-neutral-800/50 border border-neutral-300/15 dark:border-neutral-700 rounded-xl p-1 my-1 md:space-x-9 space-x-2 justify-center">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => scrollToSection(tab.id)}
      className={cn(
        "group cursor-pointer  text-shadow-md relative px-2  py-1 rounded-xl transition-all duration-200 flex items-center space-x-2.5",
       "shadow-[0_1px_2px_rgba(0,0,0,0.15)]",
      
    // " [text-shadow:0px_1px_3px_rgba(0,0,0,0.2)]",
        activeTab === tab.id 
          ? "bg-gradient-to-b from-primary/85  to-primary/65 text-neutral-50 shadow-md shadow-primary/40"
          : "hover:bg-neutral-600/30 dark:hover:bg-neutral-700/30 text-neutral-50/90 dark:text-neutral-300/90"
      )}
    >
      <div className={cn(
        "p-1 rounded-lg transition-colors",
        activeTab === tab.id 
          ? "bg-primary-light/15"
          : "bg-neutral-600/20 group-hover:bg-neutral-500/20"
      )}>
        {tab.icon}
      </div>
      <span className="text-sm font-medium tracking-tight">{tab.label}</span>
      
      {/* Slim active indicator */}
      {/* {activeTab === tab.id && (
        <div className="absolute bottom-0 inset-x-2 h-[2px]  bg-primary/30 rounded-t-full" />
      )} */}
    </button>
  ))}
</div>
        </div>
      </div>

      {/* Sections */}
      <section className="presentaciont-carousel text-neutral-800  dark:text-neutral-200">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={tab.id}
            ref={(el) => {
              sectionRefs.current[tab.id] = el;
            }}
            className="min-h-screen  flex flex-col  justify-center items-center  px-4 pt-8"
          >
            <div className="flex  flex-col justify-center items-center">
              <h2 className="text-xl mb-5 font-bold  text-center">
                {tab.title}
              </h2>
            </div>

            <section
              className="presentation w-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-400 dark:border-neutral-600 py-4 px-4 rounded-3xl my-1 flex flex-col justify-between sm:flex-row"
              style={dotPatternStyle}
            >
              <ul className="w-full sm:w-5/12 space-y-2  p-1 rounded-xl">
                <h6 className="text-sm font-semibold underline">Pages & Components:</h6>
                {tab.features.map((feature, i) => (
                  <li
                    key={i}
                    className="text-xs text-neutral-700 dark:text-neutral-300 bg-neutral-200 flex  justify-start items-start  dark:bg-neutral-800 p-1 border border-neutral-400 dark:border-neutral-600 rounded-lg"
                  >
                    <StickyNote
                      size={16}
                      className="mr-1 shrink-0 text-neutral-600 dark:text-neutral-400"
                    />{" "}
                    {feature}
                  </li>
                ))}
                <h6 className="mt-4 text-sm font-semibold underline">Authentication:</h6>
                <div className="border backdrop-blur-xs text-xs mt-2 border-success/30 bg-success-l/10 dark:border-success-l/80 rounded-lg p-1 sm:flex ">
                  {/* <ShieldCheck size={16} className="mr-1 shrink-0" /> */}
                  <p className=" sm:flex">
                    <span
                      className="ml-1 text-neutral-700 dark:text-neutral-300"
                      dangerouslySetInnerHTML={{ __html: tab.auth }}
                    />
                  </p>
                </div>
              </ul>

              <div className="w-full sm:w-5/12 flex pb-3 justify-center items-center">
                {tab.label === "Business" ? (
                  <ImageGallery />
                ) : (
                  <div className="relative bg-neutral-200 dark:bg-neutral-700 w-fit h-fit rounded-2xl  group mt-8 sm:mt-4 shadow-xl">
                    <Image
                      src={tab.image}
                      alt={tab.title}
                      className="sm:rounded-2xl rounded-tr-2xl rounded-tl-2xl w-full "
                      width={500}
                      height={300}
                    />
                    <div className="text-sm  sm:text-neutral-200 sm:pt-24 min-h-fit sm:absolute sm:bottom-0   sm:bg-linear-to-b  from-neutral-50/0 to-neutral-700 rounded-bl-2xl rounded-br-2xl px-1 py-1">
                      <p className=" sm:bg-neutral-700/30 leading-4.5   backdrop-blur-sm sm:p-2.5 p-1 rounded-2xl sm:border border-neutral-400 ">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        ))}
      </section>
    </section>
  );
};
