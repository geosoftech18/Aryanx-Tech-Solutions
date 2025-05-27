"use client"

import { HomepageStat } from "@prisma/client"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface StatProps {
  percentage: number
  description: string
  delay?: number
}

const CircularStat = ({ percentage, description, delay = 0 }: StatProps) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Calculate the circle properties
  const radius = 85
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Calculate dash properties for decorative circle
  const totalDashes = 60 // Number of dashes around the circle
  const dashLength = (2 * Math.PI * radius) / totalDashes
  const decorativeDasharray = `${dashLength * 0.1}, ${dashLength * 0.3}` // 30% dash, 70% gap

  useEffect(() => {
    let startCount = 0
    if (isInView) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          startCount += 1
          setCount(startCount)

          if (startCount >= percentage) {
            clearInterval(interval)
          }
        }, 20)

        return () => clearInterval(interval)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [isInView, percentage, delay])

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-44 h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={radius} fill="transparent" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="20" />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="20"
            strokeLinecap="round"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={isInView ? { 
              strokeDasharray: circumference,
              strokeDashoffset 
            } : { 
              strokeDasharray: circumference,
              strokeDashoffset: circumference 
            }}
            transition={{ duration: 1.5, delay }}
          />
          {/* Decorative dashed circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="20"
            strokeDasharray={decorativeDasharray}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.5 }}
            style={{ transformOrigin: 'center' }}
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-5xl md:text-6xl lg:text-7xl font-bold flex items-baseline">
            {count}
            <span className="text-2xl md:text-3xl lg:text-4xl">%</span>
          </span>
        </div>
      </div>
      <p className="mt-4 text-center text-white text-base md:text-lg max-w-[250px]">{description}</p>
    </div>
  )
}

// Background animated elements
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large circle top left */}
      <motion.div
        className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-700/20"
        animate={{
          scale: [1, 1.05, 1],
          x: [0, 10, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Medium circle bottom right */}
      <motion.div
        className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-blue-600/10"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, -20, 0],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Small circles scattered */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-16 h-16 rounded-full bg-blue-400/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Tiny dots pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-300/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              y: [0, Math.random() * 20 - 10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Horizontal lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`line-${i}`}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Diagonal lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
        <motion.line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="rgba(59, 130, 246, 0.3)"
          strokeWidth="1"
          strokeDasharray="10,20"
          animate={{
            strokeDashoffset: [0, -30],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke="rgba(59, 130, 246, 0.2)"
          strokeWidth="1"
          strokeDasharray="10,30"
          animate={{
            strokeDashoffset: [0, 40],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </svg>
    </div>
  )
}

export default function BusinessImpactSection({stats,title,subtitle}: {stats: HomepageStat[],title: string,subtitle: string}) {
  // State to track if the component has mounted
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after the component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Optionally, you can show a loader or nothing until mounted
  if (!isMounted) {
    // You can replace this with a spinner or skeleton if desired
    return null
  }

  const titlewords = title.split(" ")

  const titlewithoutlastword = titlewords.filter((_, index) => index != titlewords.length - 1).join(" ")
  const lastword = titlewords.filter((_, index) => index == titlewords.length - 1)[0]

  return (
    <section className="bg-blue-900 py-16 md:py-20 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left column with text */}
          <div className="lg:col-span-4">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
              {titlewithoutlastword}
            </h2>
            <div className="text-blue-300 text-6xl md:text-7xl font-bold mb-6">
              {lastword.toUpperCase()}
            </div>
            <p className="text-white/80 mb-8">
              {subtitle}
            </p>
            {/* <Link
              href="/about/impact"
              className="inline-flex items-center text-blue-300 hover:text-white transition-colors group"
            >
              <span className="text-lg font-medium">Explore our business impact</span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link> */}
          </div>

          {/* Right column with stats */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-6">
              {stats.map((stat) => (
                <CircularStat
                  key={stat.id}
                  percentage={stat.percentage}
                  description={stat.description}
                  delay={0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
