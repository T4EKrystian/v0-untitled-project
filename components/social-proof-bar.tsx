"use client"

import { useEffect, useState } from "react"

export function SocialProofBar() {
  const [realEstateDeals, setRealEstateDeals] = useState(400)
  const [investors, setInvestors] = useState(600)

  useEffect(() => {
    // Update real estate deals very slowly (every 30 seconds)
    const intervalIdRealEstate = setInterval(() => {
      if (Math.random() < 0.1) {
        // Only 10% chance to increment
        setRealEstateDeals((prevCount) => Math.min(prevCount + 1, 420))
      }
    }, 30000)

    // Update investors count more slowly and realistically (every 2 minutes)
    const intervalIdInvestors = setInterval(() => {
      if (Math.random() < 0.2) {
        // Only 20% chance to increment
        setInvestors((prevCount) => Math.min(prevCount + 1, 650))
      }
    }, 120000) // Every 2 minutes

    return () => {
      clearInterval(intervalIdRealEstate)
      clearInterval(intervalIdInvestors)
    }
  }, [])

  return (
    <div className="bg-gold/5 py-3 border-b border-gold/10">
      <div className="container">
        <div className="flex justify-center items-center gap-8 md:gap-16">
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-bold text-navy">{realEstateDeals}+</span>
            <p className="text-sm md:text-base text-navy/80">Zrealizowanych transakcji</p>
          </div>
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-bold text-navy">{investors}+</span>
            <p className="text-sm md:text-base text-navy/80">Zadowolonych inwestorów</p>
          </div>
        </div>
      </div>
    </div>
  )
}
