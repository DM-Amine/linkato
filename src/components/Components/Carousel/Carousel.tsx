"use client"

import { useEffect, useState, useRef } from "react"
import { motion, type PanInfo, useMotionValue, useTransform, type Transition } from "framer-motion"
import Image from "next/image"
import "./carousel.css" // Ensure you have the appropriate CSS for styling

export interface CarouselItem {
  id: number
  image: string
}

export interface CarouselProps {
  items?: CarouselItem[]
  baseWidth?: number
  autoplay?: boolean
  autoplayDelay?: number
  pauseOnHover?: boolean
  loop?: boolean
  round?: boolean
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { id: 1, image: "/images/mockups/mockup1.png" },
  { id: 2, image: "/images/mockups/mockup2.png" },
  { id: 3, image: "/images/mockups/mockup3.png" },
  { id: 4, image: "/images/mockups/mockup4.png" },
  { id: 5, image: "/images/mockups/mockup5.png" },
]

const DRAG_BUFFER = 0
const VELOCITY_THRESHOLD = 500
const GAP = 16

const SPRING_OPTIONS: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps) {
  const containerPadding = 16
  const itemWidth = baseWidth - containerPadding * 2
  const trackItemOffset = itemWidth + GAP

  const x = useMotionValue(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Create carousel items (add duplicate first item for seamless loop)
  const carouselItems = loop ? [...items, items[0]] : items

  // Create individual useTransform hooks for each possible item (up to 10 items max)
  // This avoids calling hooks inside loops or callbacks
  const transform0 = useTransform(x, [-trackItemOffset, 0, trackItemOffset], [90, 0, -90], { clamp: false })
  const transform1 = useTransform(x, [-2 * trackItemOffset, -trackItemOffset, 0], [90, 0, -90], { clamp: false })
  const transform2 = useTransform(x, [-3 * trackItemOffset, -2 * trackItemOffset, -trackItemOffset], [90, 0, -90], {
    clamp: false,
  })
  const transform3 = useTransform(x, [-4 * trackItemOffset, -3 * trackItemOffset, -2 * trackItemOffset], [90, 0, -90], {
    clamp: false,
  })
  const transform4 = useTransform(x, [-5 * trackItemOffset, -4 * trackItemOffset, -3 * trackItemOffset], [90, 0, -90], {
    clamp: false,
  })
  const transform5 = useTransform(x, [-6 * trackItemOffset, -5 * trackItemOffset, -4 * trackItemOffset], [90, 0, -90], {
    clamp: false,
  })

  const transforms = [transform0, transform1, transform2, transform3, transform4, transform5]

  // Mouse hover handlers
  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return

    const container = containerRef.current
    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    container.addEventListener("mouseenter", handleMouseEnter)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [pauseOnHover])

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered)) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === items.length - 1 && loop) return prev + 1
        if (prev === carouselItems.length - 1) return loop ? 0 : prev
        return prev + 1
      })
    }, autoplayDelay)

    return () => clearInterval(timer)
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, items.length, loop, carouselItems.length])

  const effectiveTransition: Transition = isResetting ? { duration: 0 } : SPRING_OPTIONS

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true)
      x.set(0)
      setCurrentIndex(0)
      setTimeout(() => setIsResetting(false), 50)
    }
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offset = info.offset.x
    const velocity = info.velocity.x

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1))
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1)
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0))
      }
    }
  }

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      }

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className={`carousel-item ${round ? "round" : ""}`}
            style={{
              width: itemWidth,
              height: round ? itemWidth : "100%",
              rotateY: transforms[index] || 0,
              ...(round && { borderRadius: "50%" }),
            }}
            transition={effectiveTransition}
          >
            <Image
              src={item.image || "/placeholder.svg"}
              alt={`Carousel item ${item.id}`}
              width={itemWidth}
              height={round ? itemWidth : 200}
              className={`carousel-item-image ${round ? "round" : ""}`}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`carousel-indicator ${currentIndex % items.length === index ? "active" : "inactive"}`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
