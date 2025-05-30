"use client"
import { useCountUp } from "@/hooks/use-count-up"

interface AnimatedStatProps {
  value: number
  label: string
  duration?: number
  delay?: number
  isPercent?: boolean // If true, show value as percent
}

export function AnimatedStat({
  value,
  label,
  duration = 2000,
  delay = 0,
  isPercent = false,
}: AnimatedStatProps) {
  // Use the isPercent flag to determine the formatter
  const { count, ref } = useCountUp({
    end: value,
    duration,
    delay,
    formatter: isPercent
      ? (value) => `${Math.floor(value)}%`
      : (value) => Math.floor(value).toString(),
  })

  return (
    <div className="text-center" ref={ref}>
      <div className="text-3xl font-bold text-primary">{count}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
