"use client"

import { useState, useEffect, useRef } from "react"

interface UseCountUpProps {
  end: number
  start?: number
  duration?: number
  delay?: number
  formatter?: (value: number) => string
}

export function useCountUp({
  end,
  start = 0,
  duration = 2000,
  delay = 0,
  formatter = (value) => Math.floor(value).toString(),
}: UseCountUpProps) {
  const [count, setCount] = useState(start)
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const countingStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInView || countingStarted.current) return

    countingStarted.current = true

    const startTime = Date.now() + delay
    const endTime = startTime + duration

    const timer = setTimeout(() => {
      const animate = () => {
        const now = Date.now()

        if (now >= endTime) {
          setCount(end)
          return
        }

        const elapsed = now - startTime
        const progress = elapsed / duration
        const currentCount = start + (end - start) * easeOutQuad(progress)

        setCount(currentCount)
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }, delay)

    return () => clearTimeout(timer)
  }, [start, end, duration, delay, isInView])

  // Easing function for smoother animation
  const easeOutQuad = (x: number): number => {
    return 1 - (1 - x) * (1 - x)
  }

  return { count: formatter(count), ref }
}
