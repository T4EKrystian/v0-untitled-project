"use client"

import Image from "next/image"

export function WebinarHostInfo() {
  return (
    <div className="flex items-center gap-4 mb-6 bg-navy-800 p-4 rounded-lg border border-gold/20 shadow-gold">
      <div className="relative h-20 w-20 rounded-full overflow-hidden refined-shadow shrink-0">
        <Image src="/placeholder.svg?height=200&width=200" alt="Webinar host" fill className="object-cover" />
      </div>
      <div>
        <p className="font-medium text-lg text-gold-300">Marek Kowalski</p>
        <p className="text-white font-normal">
          Ekspert rynku nieruchomości w Dubaju. Inwestor z wieloletnim doświadczeniem.
        </p>
      </div>
    </div>
  )
}
