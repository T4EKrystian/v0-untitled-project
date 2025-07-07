"use client"

import { useState, useEffect } from "react"

interface LimitedSpotsCounterProps {
  totalSpots: number
  takenSpots: number
  className?: string
}

export function LimitedSpotsCounter({
  totalSpots,
  takenSpots: initialTakenSpots,
  className = "",
}: LimitedSpotsCounterProps) {
  const [takenSpots, setTakenSpots] = useState(initialTakenSpots)
  const remainingSpots = totalSpots - takenSpots
  const percentageTaken = (takenSpots / totalSpots) * 100

  // Symulacja rezerwacji miejsc w czasie rzeczywistym
  useEffect(() => {
    const interval = setInterval(() => {
      if (takenSpots < totalSpots - 3) {
        // Losowo zwiększaj liczbę zajętych miejsc, ale zatrzymaj się na 3 miejscach przed końcem
        const shouldIncrease = Math.random() < 0.3 // 30% szans na zwiększenie
        if (shouldIncrease) {
          setTakenSpots((prev) => prev + 1)
        }
      }
    }, 30000) // Co 30 sekund

    return () => clearInterval(interval)
  }, [takenSpots, totalSpots])

  // ──────────────────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────────────────
  return null
}
