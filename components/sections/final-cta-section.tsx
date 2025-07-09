"use client"

import type React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { LimitedSpotsCounter } from "@/components/limited-spots-counter"

interface FinalCTASectionProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function FinalCTASection({ onCtaClick }: FinalCTASectionProps) {
  // Add scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-gradient")
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden section-light modern-section">
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 -bottom-48 -right-48"></div>
      <div className="designer-circle w-80 h-80 opacity-10 top-[20%] left-[5%]"></div>
      <div className="designer-square w-40 h-40 opacity-10 top-[40%] right-[10%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 right-[25%]"></div>
      <div className="blurred-dots bottom-20 left-[15%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-circle w-96 h-96 -bottom-48 -right-48"></div>
      <div className="geometric-shape geometric-triangle w-64 h-64 top-20 -left-32 rotate-180"></div>
      <div className="absolute inset-0 subtle-dots"></div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="elegant-badge text-gold-600 inline-block mb-3 sm:mb-4 reveal">
            <span className="designer-dot"></span>
            Nie przegap okazji
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-5 reveal-left">
            {Math.random() > 0.5
              ? "Ceny rosną. Popyt rośnie. Inwestorzy działają – a Ty nadal się zastanawiasz?"
              : "Zabezpiecz miejsce na webinarze i zobacz, jak zacząć od 600 000 zł lub mniej – bez pośredników i bez podatków"}
          </h2>
          <p
            className="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4 reveal-right luxury-text"
            style={{ transitionDelay: "0.2s" }}
          >
            Kupno mieszkania w Dubaju to nie tylko sposób na dochód pasywny – to też zabezpieczenie kapitału, styl życia
            i dostęp do rynku, który rozwija się szybciej niż jakikolwiek w Europie. Zapisz się i zobacz, co możesz
            zyskać – niezależnie, czy szukasz ROI, czy nowego miejsca do życia.
          </p>
          <p
            className="text-gray-500 text-base sm:text-lg mb-6 sm:mb-8 reveal-right luxury-text"
            style={{ transitionDelay: "0.3s" }}
          >
            Myślisz o przeprowadzce? Dubaj to realna alternatywa: bezpiecznie, nowocześnie i z nieruchomościami, które
            same pracują na Twoją przyszłość.
          </p>
          <div
            className="grid gap-3 sm:gap-4 sm:grid-cols-2 max-w-lg mx-auto mb-6 sm:mb-8 reveal"
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="bg-gradient-to-br from-navy-800/90 to-navy-900 border-gold/30 border-0 rounded-md p-4 sm:p-5 text-center refined-shadow card-stack hover-lift">
              <div className="text-gold-300 text-2xl sm:text-3xl luxury-heading luxury-number">27</div>
              <div className="text-gray-300/80">lipca 2025</div>
            </div>
            <div className="bg-gradient-to-br from-navy-800/90 to-navy-900 border-gold/30 border-0 rounded-md p-4 sm:p-5 text-center refined-shadow card-stack hover-lift">
              <div className="text-gold-300 text-2xl sm:text-3xl luxury-heading luxury-number">19:30</div>
              <div className="text-gray-300/80">czasu polskiego</div>
            </div>
          </div>
          <div className="max-w-md mx-auto mb-6 reveal" style={{ transitionDelay: "0.4s" }}>
            <LimitedSpotsCounter totalSpots={50} takenSpots={42} />
          </div>
          <Button
            variant="modern"
            size="xl"
            onClick={onCtaClick}
            className="px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg refined-button shimmer reveal bg-gradient-to-br from-gold-600 to-gold-800 text-white border-gold/30 hover:from-gold-500 hover:to-gold-700"
            style={{ transitionDelay: "0.5s" }}
          >
            Zapisuję się
          </Button>
          <p className="text-gray-500 mt-4 reveal" style={{ transitionDelay: "0.6s" }}>
            Po zapisaniu się otrzymasz potwierdzenie oraz link do webinaru na podany adres email.
          </p>
        </div>
      </div>
    </section>
  )
}
