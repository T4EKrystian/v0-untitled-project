"use client"

import Image from "next/image"
import { Award, Building2, Briefcase } from "lucide-react"

export function WebinarHostInfo() {
  return (
    <div className="bg-navy-800 p-4 rounded-lg border border-gold/20 shadow-gold">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden refined-shadow shrink-0 border-2 border-gold/30">
          <Image
            src="/images/real-estate-expert.jpeg"
            alt="Adam Nowak - ekspert rynku nieruchomości w Dubaju"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 96px, 112px"
          />
        </div>
        <div>
          <p className="font-medium text-lg sm:text-xl text-gold-300 mb-1">Adam Nowak</p>
          <p className="text-white font-normal mb-2">Opiekun Inwestorów</p>
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="flex items-center gap-1 bg-navy-700/50 px-2 py-1 rounded-md">
              <Award className="h-3.5 w-3.5 text-gold-300" />
              <span className="text-xs text-white">13+ lat doświadczenia</span>
            </div>
            <div className="flex items-center gap-1 bg-navy-700/50 px-2 py-1 rounded-md">
              <Building2 className="h-3.5 w-3.5 text-gold-300" />
              <span className="text-xs text-white">400+ transakcji</span>
            </div>
            <div className="flex items-center gap-1 bg-navy-700/50 px-2 py-1 rounded-md">
              <Briefcase className="h-3.5 w-3.5 text-gold-300" />
              <span className="text-xs text-white">Certyfikowany doradca</span>
            </div>
          </div>
          <p className="text-gray-300 text-sm mt-3">
            Specjalista w zakresie inwestycji premium w Dubaju. Pomógł ponad 400 klientom z Europy w bezpiecznym
            lokowaniu kapitału w nieruchomościach o najwyższym potencjale wzrostu.
          </p>
        </div>
      </div>
    </div>
  )
}
