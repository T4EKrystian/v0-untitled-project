"use client"

import type React from "react"

import Image from "next/image"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WebinarHostInfo } from "@/components/webinar-host-info"

interface WebinarValueSectionProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function WebinarValueSection({ onCtaClick }: WebinarValueSectionProps) {
  const webinarFeatures = [
    "Aktualna sytuacja na rynku i ceny nieruchomości",
    "Jak uniknąć błędów na starcie",
    "Przykładowe zwroty z inwestycji",
    "Jak wygląda współpraca z lokalnymi operatorami",
    "Przewodnik po dzielnicach – co, gdzie i za ile",
  ]

  return (
    <section id="webinar" className="py-8 sm:py-12 md:py-16 section-dark modern-section relative overflow-hidden">
      {/* Geometric shapes */}
      <div className="geometric-shape geometric-triangle w-64 h-64 top-20 -left-32 rotate-12"></div>
      <div className="geometric-shape geometric-circle w-80 h-80 bottom-20 -right-40"></div>
      <div className="absolute inset-0 subtle-dots opacity-20"></div>

      <div className="container relative z-10">
        <div className="text-center mb-8 sm:mb-10">
          <div className="elegant-badge text-gold-600 inline-block mb-3">
            <span className="designer-dot"></span>O webinarze
            <span className="designer-dot"></span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 luxury-heading">
            Poznaj kulisy inwestowania w Dubaju
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto luxury-text">
            Nie sprzedajemy marzeń – pokazujemy konkrety: ROI, wzrost wartości, porównania dzielnic i modeli najmu.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-10 lg:grid-cols-2 items-center">
          <div className="relative fade-in">
            <div className="aspect-video rounded-md overflow-hidden border-0 bg-white refined-shadow">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-gold-500 flex items-center justify-center cursor-pointer hover:bg-gold-600 transition-colors">
                  <svg className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="Webinar preview"
                width={1280}
                height={720}
                className="object-cover opacity-50"
              />
            </div>
          </div>
          <div className="space-y-4 sm:space-y-5 fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="bg-white p-4 sm:p-5 rounded-md shadow-gold mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-navy mb-3">
                Dlaczego warto wziąć udział w webinarze?
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-navy-600 text-lg font-medium mb-1">
                      Dowiesz się, dlaczego Dubaj przyciąga inwestorów z całego świata
                    </p>
                    <p className="text-navy-500 text-sm">
                      Poznasz najważniejsze czynniki, które sprawiają, że rynek nieruchomości w Dubaju jest jednym z
                      najbardziej dynamicznych i perspektywicznych na świecie.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-navy-600 text-lg font-medium mb-1">
                      Zdobędziesz praktyczną wiedzę o procesie inwestycyjnym
                    </p>
                    <p className="text-navy-500 text-sm">
                      Krok po kroku przeprowadzimy Cię przez proces zakupu nieruchomości – od wyboru lokalizacji, przez
                      formalności, aż po zarządzanie inwestycją.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-navy-600 text-lg font-medium mb-1">Poznasz korzyści podatkowe i prawne</p>
                    <p className="text-navy-500 text-sm">
                      Wyjaśnimy, jakie ulgi i ułatwienia czekają na zagranicznych inwestorów oraz jak bezpiecznie
                      przeprowadzić transakcję.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-navy-600 text-lg font-medium mb-1">
                      Otrzymasz wskazówki od ekspertów z doświadczeniem na rynku dubajskim
                    </p>
                    <p className="text-navy-500 text-sm">
                      Podzielimy się z Tobą praktycznymi przykładami i odpowiemy na Twoje pytania na żywo.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5 text-gold">
                    <span className="font-bold">5</span>
                  </div>
                  <div>
                    <p className="text-navy-600 text-lg font-medium mb-1">
                      Przedstawimy sprawdzone strategie maksymalizowania zysków
                    </p>
                    <p className="text-navy-500 text-sm">
                      Poznasz strategie maksymalizowania zysków z wynajmu oraz „flipów".
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <WebinarHostInfo />

            <div className="bg-white p-4 sm:p-5 rounded-md refined-shadow mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl luxury-heading mb-3">Podczas webinaru poznasz:</h3>
              <div className="space-y-3">
                {webinarFeatures.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" strokeWidth={1} />
                    <span className="text-navy-600 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 sm:pt-3">
              <div className="flex items-center gap-4 mb-4 bg-gold-50 p-3 sm:p-4 rounded-md">
                <div className="relative h-12 w-12 rounded-full overflow-hidden shadow-sm">
                  <Image
                    src="/images/real-estate-expert.jpeg"
                    alt="Wojciech Paciejewski - ekspert rynku nieruchomości w Dubaju"
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div>
                  <p className="font-medium text-lg">Wojciech Paciejewski</p>
                  <p className="text-navy-600">Opiekun Inwestorów z 13-letnim doświadczeniem</p>
                </div>
              </div>
              <Button variant="modern" size="lg" onClick={onCtaClick} className="w-full refined-button">
                Zapisz się na webinar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
