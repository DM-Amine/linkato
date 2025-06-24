// 'use client'

// import { useEffect, useState } from 'react'
// import { Twitter, Linkedin } from 'lucide-react'

// export default function ThankYouPage() {
//   const [showCard, setShowCard] = useState(false)
//   const [showTitle, setShowTitle] = useState(false)

//   useEffect(() => {
//     const titleTimer = setTimeout(() => setShowTitle(true), 50)
//     const cardTimer = setTimeout(() => setShowCard(true), 300)
//     return () => {
//       clearTimeout(titleTimer)
//       clearTimeout(cardTimer)
//     }
//   }, [])

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-neutral-200 to-white dark:from-neutral-900 dark:to-neutral-950">
//       <div className="max-w-md w-full space-y-6">
//         <div
//           className={`transform transition-all duration-700 ${
//             showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6'
//           }`}
//         >
//           <h1 className="text-3xl text-center font-bold text-primary">
//             🎉 You&apos;re in! 🎉
//             <br />
//             <span className="text-neutral-800 dark:text-neutral-200 font-semibold text-xl block mt-2">
//               Thank you for your interest.
//             </span>
//           </h1>
//         </div>

//         <div
//           className={`bg-neutral-100 dark:bg-neutral-900 font-medium border-2 border-white dark:border-neutral-800 rounded-2xl shadow-2xl px-4 py-4 space-y-4 transform transition-all duration-700 ${
//             showCard ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
//           }`}
//         >
//           <p className="text-neutral-700 dark:text-neutral-300 text-center">
//             You&apos;ve been successfully added to the waitlist.
//             <br />
//             We&apos;ll notify you by email once we&apos;re ready.
//             <br />
//             <span className="block mt-2">In the meantime, stay connected:</span>
//           </p>

//           <div className="flex justify-center items-center mt-2 border-t border-neutral-300 dark:border-neutral-700 pt-3 space-x-6">
//             <a
//               href="https://twitter.com/YOUR_HANDLE"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center text-sm text-info hover:scale-110 transition-transform"
//             >
//               <Twitter className="w-4 h-4 mr-1" />
//               Twitter
//             </a>
//             <a
//               href="https://linkedin.com/in/YOUR_PROFILE"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center text-sm text-info hover:scale-110 transition-transform"
//             >
//               <Linkedin className="w-4 h-4 mr-1" />
//               LinkedIn
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
