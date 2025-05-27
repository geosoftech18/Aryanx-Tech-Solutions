"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { HomepageFeatureSlide } from "@prisma/client"


export default function FeatureSlider({ slides }: { slides: HomepageFeatureSlide[] }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }, [slides.length])

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <section
      className="relative w-full h-[500px] md:h-[550px] overflow-hidden "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <AnimatePresence key={slide.id} initial={false}>
            {currentSlide === index && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  <div
                    className="absolute inset-0 bg-gradient-to-r opacity-90"
                    style={{
                      backgroundImage: `url(${slide.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`}></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex items-center px-4 md:px-10">
                  <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-xl md:max-w-2xl text-white">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <p className="text-base md:text-lg font-medium mb-2">{slide.subheading}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
                          {slide.heading.split("").map((char, i) => (
                            <motion.span
                              key={i}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: 0.5 + i * 0.03 }}
                              className="inline-block"
                            >
                              {char === " " ? "\u00A0" : char}
                            </motion.span>
                          ))}
                        </h2>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                      >
                        <p className="text-base md:text-lg mb-5 md:mb-6">{slide.description}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                      >
                        <Button
                          size="lg"
                          className="bg-white text-gray-900 hover:bg-gray-100 font-semibold text-base px-8"
                          asChild
                        >
                          <a href={slide.buttonLink}>{slide.buttonText}</a>
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-1.5 md:p-2 z-10 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-1.5 md:p-2 z-10 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-2 h-2 md:w-3 md:h-3 rounded-full transition-all",
              currentSlide === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70",
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full p-1.5 transition-all z-10"
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? <Pause className="h-4 w-4 md:h-5 md:w-5" /> : <Play className="h-4 w-4 md:h-5 md:w-5" />}
      </button>
    </section>
  )
}
