import CTA from "@/components/CTA";
import Carousel from "@/components/Components/Carousel/Carousel";

export default function Hero() {
  return (
    <section className="w-full flex justify-center items-center px-4 py-10">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center  w-full ">
        
        {/* LEFT - Text Content */}
        <div className="mx-8  space-y-6 text-center lg:text-left">
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
        <div className="flex mx-8  justify-center">
          <div style={{ height: 520, position: "relative" }}>
            <Carousel
              baseWidth={260}
              autoplay
              autoplayDelay={3000}
              pauseOnHover
              loop
              round={false}
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}
