"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Sample partner logos
const partners = [
  {
    id: 1,
    name: "TechCorp",
    logo: "/accenture.png",
  },
  {
    id: 2,
    name: "InnovateTech",
    logo: "/accenture.png",
  },
  {
    id: 3,
    name: "CloudSolutions",
    logo: "/accenture.png",
  },
  {
    id: 4,
    name: "DesignHub",
    logo: "/accenture.png",
  },
  {
    id: 5,
    name: "DataInsights",
    logo: "/accenture.png",
  },
  {
    id: 6,
    name: "GrowthMarketing",
    logo: "/accenture.png",
  },
  {
    id: 7,
    name: "SecureTech",
    logo: "/accenture.png",
  },
  {
    id: 8,
    name: "GlobalConnect",
    logo: "/accenture.png",
  },
]

// Dot animation variants
const dotVariants = {
  inactive: { scale: 1, opacity: 0.5 },
  active: {
    scale: 1.25,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
}

export default function PartnersCarousel() {
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [autoPlay, setAutoPlay] = useState(true)
  const [dragConstraints, setDragConstraints] = useState({ right: 0, left: 0 })
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Calculate total pages based on items per page
  const totalPages = Math.ceil(partners.length / itemsPerPage)

  // Update items per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2)
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(5)
      } else {
        setItemsPerPage(6)
      }
    }

    // Initial call
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Update carousel constraints when the component mounts or window resizes
  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current
      const containerWidth = carousel.offsetWidth
      const contentWidth = carousel.scrollWidth

      // Only allow dragging if content is wider than container
      if (contentWidth > containerWidth) {
        setDragConstraints({
          right: 0,
          left: -(contentWidth - containerWidth),
        })
      } else {
        setDragConstraints({ right: 0, left: 0 })
      }
    }
  }, [itemsPerPage])

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
      }, 4000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [autoPlay, totalPages])

  // Navigation functions
  const nextPage = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex)
  }

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoPlay(false)
  const handleMouseLeave = () => setAutoPlay(true)

  // Calculate the offset for the current page
  const getPageOffset = () => {
    if (!carouselRef.current) return 0

    const carousel = carouselRef.current
    const logoWidth = carousel.querySelector("div")?.offsetWidth || 0
    const gap = 8 // Reduced from 16px to 8px to match the new gap-2 class

    // Calculate the width of each logo + gap
    const itemWidth = logoWidth + gap

    // Calculate the offset based on the current page
    return -(currentPage * itemsPerPage * itemWidth)
  }

  // Create a duplicated array of partners for smooth infinite scroll
  const extendedPartners = [...partners, ...partners.slice(0, itemsPerPage)]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We collaborate with leading companies across various industries to bring you the best job opportunities.
          </p>
        </div>

        <div className="relative px-20" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {/* Logo Carousel */}
          <div className="overflow-hidden py-8">
            <motion.div
              ref={carouselRef}
              className="flex items-center gap-2 "
              animate={{ x: getPageOffset() }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 14,
                mass: 0.75,
              }}
              drag="x"
              dragConstraints={dragConstraints}
              onDragStart={() => {
                if (autoPlayRef.current) {
                  clearInterval(autoPlayRef.current)
                  setAutoPlay(false)
                }
              }}
            >
              {extendedPartners.map((partner, index) => (
                <motion.div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 w-32 h-20 sm:w-36 sm:h-24 flex items-center justify-center bg-gray-50 rounded-lg p-4 border border-gray-100"
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  }}
                >
                  <Image
                    width={120}
                    height={80}
                    src={partner.logo || "/placeholder.svg"}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      // Fallback for missing images
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=80&width=120&query=company logo for ${partner.name}`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prevPage}
            className="absolute left-0 top-1/3 -translate-y-1/3 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-md z-10 transition-all"
            aria-label="Previous partners"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="h-5 w-5" />
          </motion.button>
          <motion.button
            onClick={nextPage}
            className="absolute right-0 top-1/3 -translate-y-1/3 bg-white hover:bg-gray-100 text-gray-700 rounded-full p-2 shadow-md z-10 transition-all"
            aria-label="Next partners"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="h-5 w-5" />
          </motion.button>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToPage(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  currentPage === index ? "bg-blue-600" : "bg-gray-300 hover:bg-gray-400",
                )}
                variants={dotVariants}
                initial="inactive"
                animate={currentPage === index ? "active" : "inactive"}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to partner group ${index + 1}`}
                aria-current={currentPage === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
