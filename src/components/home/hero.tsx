import CTA from "@/components/CTA"
import Carousel from "@/components/Components/Carousel/Carousel"

const customItems = [
  { id: 1, image: "/images/mockups/mockup1.png" },
  { id: 2, image: "/images/mockups/mockup2.png" },
  { id: 3, image: "/images/mockups/mockup3.png" },
  { id: 4, image: "/images/mockups/mockup4.png" },
  { id: 5, image: "/images/mockups/mockup5.png" },
]

export default function Hero() {
  return (
   <section className="w-full flex justify-center items-center px-4 py-10">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center w-full max-w-6xl gap-8">
        {/* LEFT - Text Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h1 className="text-neutral-800 dark:text-neutral-100 text-4xl md:text-5xl font-bold leading-tight">
            Your Page. Your Brand. Simple and Clean.
          </h1>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg md:text-base max-w-xl mx-auto lg:mx-0">
            Create multiple, high conversion minimal pages. No watermark, no complexity, instant setup with flexibility.
          </p>
          <div className="flex justify-center lg:justify-start">
            <CTA />
          </div>
        </div>

        {/* RIGHT - Carousel */}
         <div className="flex flex-col h-fit items-center space-y-4">
         
          <Carousel items={customItems} loop autoplay autoplayDelay={2000} />
        </div>
      </div>
    </section>
  )
}
