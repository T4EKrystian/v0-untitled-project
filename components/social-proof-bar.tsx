"use client"

import { useEffect, useState } from "react"

export function SocialProofBar() {
  const [investors, setInvestors] = useState(500)

  useEffect(() => {
    const interval = setInterval(() => {
      setInvestors((prev) => {
        const change = Math.floor(Math.random() * 5) + 1 // Randomly add 1-5 investors
        return Math.min(prev + change, 550) // Cap at 550 to avoid unrealistic numbers
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gold/5 py-3 border-b border-gold/10">
      <div className="container">
        <p className="text-center text-navy">
          <span className="font-semibold">{investors}+</span> inwestorów zaufało nam i ulokowało kapitał w Dubaju
        </p>
      </div>
    </div>
  )
}
