"use client"

import { useEffect, useState } from "react"
import { StarRating } from "./star-rating"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel"

export function TestimonialCarousel({ testimonials }: {
  testimonials: {
    quote: string,
    name: string,
    title: string,
    rating: number,
  }[]
}) {
  // Track carousel API and current index for navigation dots
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
    // Clean up listener
    return () => {
      api.off("select", () => setCurrent(api.selectedScrollSnap()))
    }
  }, [api])

  // Responsive basis for CarouselItem
  const itemClass = "md:basis-1/3 lg:basis-1/4"

  return (
    <div className="relative max-w-full mx-auto">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className={`pl-2 md:pl-4 ${itemClass}`}>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/15 transition-colors duration-300 h-full">
                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <div className="text-white/90 italic">&quot;{testimonial.quote}&quot;</div>
                  </div>
                  <div className="mt-auto pt-4 border-t border-white/20">
                    <StarRating rating={testimonial.rating} />
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-teal-100">{testimonial.title}</div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-2 md:-left-6" />
        <CarouselNext className="-right-2 md:-right-6" />
      </Carousel>
      {/* Navigation Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 ${
              current === index ? "bg-white/80" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-current={current === index}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  )
}
