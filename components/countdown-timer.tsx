"use client"

import { useState, useEffect } from "react"

interface CountdownTimerProps {
  targetDate: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate, className = "" }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
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

  const timeUnits = [
    { label: "Dni", value: timeLeft.days },
    { label: "Godzin", value: timeLeft.hours },
    { label: "Minut", value: timeLeft.minutes },
    { label: "Sekund", value: timeLeft.seconds },
  ]

  return (
    <div className={`flex gap-2 md:gap-4 justify-center ${className}`}>
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-white/20">
            <div className="text-xl md:text-3xl font-bold text-white tabular-nums">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="text-xs md:text-sm text-white/80 mt-1">{unit.label}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
