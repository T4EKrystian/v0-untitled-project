"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  /** ISO date string e.g. "2025-07-27T19:30:00" */
  targetDate: string
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center space-x-4 text-center">
      {(["dni", "godzin", "minut", "sekund"] as const).map((label, i) => {
        const value = Object.values(timeLeft)[i] as number
        return (
          <div
            key={label}
            className="glass-card border border-gold/10 rounded-md p-3 w-16 shadow-gold hover:shadow-gold-lg transition-all duration-300 card-3d"
          >
            <div className="text-gold text-xl font-mono font-semibold">{String(value).padStart(2, "0")}</div>
            <div className="text-navy-light/60 text-xs">{label}</div>
          </div>
        )
      })}
    </div>
  )
}

/* keep default export for existing imports */
export default CountdownTimer
