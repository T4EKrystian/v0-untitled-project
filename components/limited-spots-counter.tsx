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

  return (
    <div className={`bg-navy-50 border border-navy/10 rounded-md p-4 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-navy">Dostępne miejsca na webinar:</span>
        <span className="text-sm font-bold text-gold-600">
          {remainingSpots} z {totalSpots}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-gradient-to-r from-gold-400 to-gold-600 h-2.5 rounded-full"
          style={{ width: `${percentageTaken}%` }}
        ></div>
      </div>
      {remainingSpots < 10 && (
        <p className="text-xs text-red-500 mt-2 font-medium">
          Zostało tylko {remainingSpots} {remainingSpots === 1 ? "miejsce" : remainingSpots < 5 ? "miejsca" : "miejsc"}!
        </p>
      )}
    </div>
  )
}
