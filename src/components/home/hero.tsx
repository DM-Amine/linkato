import CTA from "@/components/CTA"
import Carousel from "@/components/Components/Carousel/Carousel"

const customItems = [
  { id: 1, image: "https://i.imgur.com/jgvv614.jpeg" },
  { id: 2, image: "https://i.imgur.com/cf4wzbQ.jpeg" },
  { id: 3, image: "https://i.imgur.com/qkR9MbN.jpeg" },
  { id: 4, image: "https://i.imgur.com/rBf43at.jpeg" },
  { id: 5, image: "https://i.imgur.com/Dn9rpSd.jpeg" },
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
