// 'use client'

// import { cn } from "@/lib/utils"
// import { useEffect } from "react"
// import { CheckCircle, Loader2, Clock } from "lucide-react"

// const steps = [
//   {
//     title: "Launch Lunitea",
//     status: "done",
//     description: "first version of Lunitea launched with core features.",
//   },
//   {
//     title: "Collect Feedback",
//     status: "current",
//     description: "Gathering feedback from early users to refine the product.",
//   },
//   {
//     title: "Email sender integration",
//     status: "upcoming",
//     description: "Integrate 'resend' for email sending and tracking.",
//   },
//   {
//     title: "Custome CMS to manage blogs, features, roadmap and much more",
//     status: "upcoming",
//     description: "Content management system already in the building phase (80% done), allow teams to manage their content for mutiple projects by with efficiently.",
//   },
//   {
//     title: "Marketplace",
//     status: "upcoming",
//     description: "more lunitea versions matching more businesses, with ability to add yours and sell it.",
//   },
//   // {
//   //   title: "Payment Integration",
//   //   status: "upcoming",
//   //   description: "Integrate Stripe or Lemonsqueesy for payment processing and subscription management.",
//   // },

  
// ];

// export default function RoadMap() {
//   const dotPatternStyle = {
//     backgroundImage: `radial-gradient(circle, var(--dot-color, rgba(0, 0, 0, 0.1)) 1px, transparent 1px)`,
//     backgroundSize: "20px 20px",
//     backgroundPosition: "0 0",
//   };

//   useEffect(() => {
//     const updateDotColor = () => {
//       const isDarkMode = document.documentElement.classList.contains("dark");
//       document.documentElement.style.setProperty(
//         "--dot-color",
//         isDarkMode ? "#5E5E5E" : "#B8B8B8"
//       );
//     };

//     updateDotColor();
//     const observer = new MutationObserver(updateDotColor);
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section className="w-full" style={dotPatternStyle}>
//       <div className="text-center py-12 sm:mb-10 mb-6">
//         <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100">
//           Dokweel Roadmap
//         </h2>
//         <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-xl mx-auto">
//           We&apos;re building Dokweel in public. Here&apos;s what we&apos;ve done and what&apos;s coming next.
//         </p>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="px-2">
//           <ol className="relative border-l-2 border-neutral-400 dark:border-neutral-700 pl-6 space-y-12">
//             {steps.map((step, index) => (
//               <li key={index} className="ml-2 relative group">
//                 {/* Step Icon */}
//                 <div
//                   className={cn(
//                     "absolute -left-[53px] w-10 h-10 rounded-full flex items-center justify-center",
//                     step.status === "done" && "bg-success/10 backdrop-blur-2xl",
//                     step.status === "current" && "bg-warning/10 backdrop-blur-2xl",
//                     step.status === "upcoming" &&
//                       "border-neutral-400 dark:border-neutral-600 bg-neutral-200 dark:bg-neutral-800 backdrop-blur-2xl"
//                   )}
//                 >
//                   {step.status === "done" && (
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                   )}
//                   {step.status === "current" && (
//                     <Loader2 className="w-5 h-5 text-warning animate-spin" />
//                   )}
//                   {step.status === "upcoming" && (
//                     <Clock className="w-5 h-5 text-neutral-500 dark:text-neutral-300" />
//                   )}
//                 </div>

//                 {/* Step Card */}
//                 <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-400 dark:border-neutral-800 px-3 py-2 rounded-2xl hover:shadow-md transition-all">
//                   <div className="flex items-center justify-between gap-2">
//                     <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
//                       {step.title}
//                     </h3>
//                     <span
//                       className={cn(
//                         "text-xs font-medium rounded-lg px-2 py-0.5 whitespace-nowrap",
//                         step.status === "done" && "bg-success/20 text-success",
//                         step.status === "current" && "bg-warning/20 text-warning",
//                         step.status === "upcoming" &&
//                           "bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300"
//                       )}
//                     >
//                       {step.status === "done" && "Completed"}
//                       {step.status === "current" && "In Progress"}
//                       {step.status === "upcoming" && "Planned"}
//                     </span>
//                   </div>
//                   <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
//                     {step.description}
//                   </p>
//                 </div>
//               </li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </section>
//   );
// }
