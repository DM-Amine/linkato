"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Scaling } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface ImageItem {
  id: number;
  src: string;
  title: string;
  description: string;
}

const sampleImages: ImageItem[] = [
  {
    id: 1,
    src: "/images/screenshots/adminPanel/adminPanel_contact.png",
    title: "Mountain Landscape",
    description:
      "Beautiful mountain range with snow-capped peaks and green valleys.",
  },
  {
    id: 2,
    src: "/images/screenshots/adminPanel/adminPanel_users_table.png",
    title: "Ocean Sunset",
    description:
      "Stunning sunset over the ocean with vibrant orange and purple hues.",
  },
  {
    id: 3,
    src: "/images/screenshots/adminPanel/adminPanel_waitlist_insights.png",
    title: "Forest Trail",
    description:
      "Serene forest path with sunlight filtering through the trees.",
  },
  {
    id: 4,
    src: "/images/screenshots/adminPanel/adminPanel_waitlist_table.png",
    title: "City Skyline",
    description: "Modern city skyline with skyscrapers illuminated at night.",
  },
];

export default function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fromCarousel, setFromCarousel] = useState(false);

  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null); // for carousel
  const descRef = useRef<HTMLParagraphElement>(null);

  const modalTitleRef = useRef<HTMLHeadingElement>(null); // for modal
  const modalDescRef = useRef<HTMLParagraphElement>(null);
  const modalImageRef = useRef<HTMLImageElement>(null);




  const [modalIndex, setModalIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!titleRef.current || !descRef.current || !fromCarousel) return;

    // Set new text content immediately (after fade-out)
    titleRef.current.textContent = sampleImages[currentIndex].title;
    descRef.current.textContent = sampleImages[currentIndex].description;

    // Animate in
    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power3.out" },
    });

    tl.fromTo(
      [titleRef.current, descRef.current],
      {
        opacity: 0,
        scale: 0.95,
        filter: "blur(4px)",
        y: 10,
      },
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
      }
    );

    setFromCarousel(false);
  }, [currentIndex, fromCarousel]);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      const newIndex = carouselApi.selectedScrollSnap();
      if (newIndex === currentIndex) return;

      if (titleRef.current && descRef.current) {
        const tl = gsap.timeline({
          defaults: { duration: 0.4, ease: "power3.out" },
        });

        // Animate out current text
        tl.to([titleRef.current, descRef.current], {
          opacity: 0,
          scale: 0.95,
          filter: "blur(4px)",
          y: -10,
        });

        // After animation, update index
        tl.add(() => {
          setFromCarousel(true);
          setCurrentIndex(newIndex);
        }, "+=0.05");
      }
    };

    carouselApi.on("select", onSelect);

    // Ensure the cleanup function returns void
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, currentIndex]);

  const openModal = (index: number) => {
    setIsModalOpen(true);
    setModalIndex(index);
  };

  useEffect(() => {
    if (modalIndex === null || !isModalOpen) return;
    if (
      !modalTitleRef.current ||
      !modalDescRef.current ||
      !modalImageRef.current
    )
      return;



    modalTitleRef.current.textContent = sampleImages[modalIndex].title;
    modalDescRef.current.textContent = sampleImages[modalIndex].description;

    const tl = gsap.timeline({
      defaults: { duration: 0.7, ease: "power3.out" },
  
    });

    tl.fromTo(
      modalImageRef.current,
      { opacity: 0, scale: 0.96, y: 15, filter: "blur(4px)" },
      { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
      0
    );

    tl.fromTo(
      [modalTitleRef.current, modalDescRef.current],
      { opacity: 0, scale: 0.95, filter: "blur(4px)", y: 10 },
      { opacity: 1, scale: 1, filter: "blur(0px)", y: 0 },
      "<0.1"
    );
  }, [modalIndex, isModalOpen]);
  useEffect(() => {

}, [modalIndex]);

  return (
    <div className="container max-w-full mx-auto  sm:mr-12 mt-8 sm:mt-0  p-1">
      {/* Carousel */}
      <Carousel
        opts={{ loop: true }}
        setApi={setCarouselApi}
        plugins={[
          Autoplay({
            delay: 2200,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="w-full px-1 py-1.5 bg-neutral-100 dark:bg-neutral-600/70  rounded-2xl shadow-2xl "
      >
        <CarouselContent>
          {sampleImages.map((img, index) => (
            <CarouselItem key={img.id} className=" ">
        <Card className="bg-neutral-100 px-0.5 !shadow-none  rounded-2xl dark:bg-neutral-600/70 border-none" >

                <div
                  className="relative cursor-pointer bg-red-200 rounded-xl"
                  onClick={() => openModal(index)}
                >
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute  p-0 h-6 w-6  top-1 right-1 z-10 text-neutral-500 dark:text-neutral-600 bg-neutral-50/60 border border-neutral-500 dark:border-neutral-600 rounded-md shadow-lg"
                  >
                    <Scaling size={18} />
                  </Button>
                  <Image
                    src={img.src}
                    alt={img.title}
                    width={600}
                    height={400}
                    className="w-full rounded-xl object-cover border border-neutral-500 dark:border-neutral-600"
                  />
                  <div className="text-xs text-neutral-600 dark:text-neutral-600 bg-neutral-50/60 px-1.5 py-0.5 border border-neutral-500 dark:border-neutral-600 rounded-xl absolute bottom-1 right-1 shadow-lg">
                    {index + 1}/{sampleImages.length}
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Title & Description (Outside Carousel) */}
      <CardContent className="text-center mt-4">
        <h3
          ref={titleRef}
          className="text-xl md:text-2xl text-neutral-800 dark:text-neutral-200 mb-1"
        >
          {sampleImages[currentIndex].title}
        </h3>
        <p ref={descRef} className="text-neutral-600 dark:text-neutral-400">
          {sampleImages[currentIndex].description}
        </p>
      </CardContent>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  {isModalOpen && (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />
  )}
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide rounded-lg bg-neutral-100 dark:bg-neutral-900 p-2">
    <DialogHeader>
      <DialogTitle className="sr-only">Image Gallery</DialogTitle>
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {sampleImages.map((image, index) => (
          <div
            key={image.id}
            className={cn(
              "flex-shrink-0 cursor-pointer rounded-md overflow-hidden border-2 transition",
              modalIndex === index
                ? "border-primary"
                : "border-neutral-400 dark:border-neutral-600"
            )}
            onClick={() => {
              if (modalIndex !== index) setModalIndex(index);
              if (!isModalOpen) setIsModalOpen(true);
         
            }}
          >
            <Image
              src={image.src}
              alt={image.title}
              width={100}
              height={75}
              className="w-12 h-12 object-cover"
            />
          </div>
        ))}
      </div>
    </DialogHeader>

   <div className="relative">
  {modalIndex !== null && (
    <div key={sampleImages[modalIndex].src}>
      {/* Aspect-ratio wrapper for layout stability */}
      <div className="relative w-full aspect-[16/10] rounded-md bg-neutral-300 dark:bg-neutral-700 overflow-hidden">
        <Image
          ref={modalImageRef}
          src={sampleImages[modalIndex].src}
          alt={sampleImages[modalIndex].title}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
      
          className="absolute inset-0 object-cover border border-neutral-500 dark:border-neutral-600 shadow-lg"
        />
      </div>

      {/* Text content */}
      <div className="mt-3">
        <h3
          ref={modalTitleRef}
          key={sampleImages[modalIndex].title}
          className="text-lg md:text-2xl text-neutral-800 font-semibold dark:text-neutral-200"
        >
          {sampleImages[modalIndex].title}
        </h3>
        <p
          ref={modalDescRef}
          key={sampleImages[modalIndex].description}
          className="text-sm text-neutral-600 dark:text-neutral-400"
        >
          {sampleImages[modalIndex].description}
        </p>
      </div>
    </div>
  )}
</div>

  </DialogContent>
</Dialog>

    </div>
  );
}
