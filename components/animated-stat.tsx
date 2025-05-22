"use client"
import { useCountUp } from "@/hooks/use-count-up"


interface AnimatedStatProps {
  value: number
  label: string
  duration?: number
  delay?: number
  formatter?: (value: number) => string
}

export function AnimatedStat({
  value,
  label,
  duration = 2000,
  delay = 0,
  formatter = (value) => Math.floor(value).toString(),
}: AnimatedStatProps) {
  const { count, ref } = useCountUp({
    end: value,
    duration,
    delay,
    formatter,
  })

  return (
    <div className="text-center" ref={ref}>
      <div className="text-3xl font-bold text-primary">{count}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  )
}
