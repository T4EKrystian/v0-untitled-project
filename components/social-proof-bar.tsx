"use client"

import { useEffect, useState } from "react"

export function SocialProofBar() {
  const [clients, setClients] = useState(500)

  useEffect(() => {
    const interval = setInterval(() => {
      setClients((prev) => {
        const change = Math.floor(Math.random() * 5) + 1 // Randomly add 1-5 clients
        return Math.min(prev + change, 550) // Cap at 550 to avoid unrealistic numbers
      })
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gold/5 py-3 border-b border-gold/10">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
          <p className="text-center text-navy">
            <span className="font-semibold">{clients}+</span> przedsiębiorców zaufało nam i założyło firmę w Dubaju
          </p>
          <div className="flex items-center text-red-600 font-medium">
            <span className="inline-block mr-2">🔥</span>
            <span>Tylko do końca kwietnia: rejestracja firmy w 5 dni + darmowe konto bankowe</span>
          </div>
        </div>
      </div>
    </div>
  )
}
