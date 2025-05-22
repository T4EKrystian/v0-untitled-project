"use client"

import type React from "react"

import { useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Star } from "lucide-react"

interface ServicePackageSectionProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function ServicePackagesSection({ onCtaClick }: ServicePackageSectionProps) {
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

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id="packages" className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden">
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 top-[10%] left-[10%]"></div>
      <div className="designer-circle w-80 h-80 opacity-10 bottom-[20%] right-[5%]"></div>
      <div className="designer-square w-60 h-60 opacity-10 top-[40%] right-[10%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 left-[15%]"></div>
      <div className="blurred-dots bottom-40 right-[20%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-square w-72 h-72 -top-36 -left-36 rotate-12"></div>
      <div className="geometric-shape geometric-circle w-96 h-96 -bottom-48 -right-48"></div>
      <div className="absolute inset-0 subtle-grid opacity-30"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Nasze pakiety"
          title={
            <span>
              Kompleksowe <span className="gradient-text-premium">wsparcie</span> w założeniu firmy w Dubaju
            </span>
          }
          description="Wybierz pakiet dopasowany do Twoich potrzeb biznesowych"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {/* Basic Package */}
          <Card className="border-gold/20 shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1 reveal">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-navy">Pakiet Podstawowy</CardTitle>
              <p className="text-sm text-gray-500">Idealne rozwiązanie dla startupów</p>
              <div className="mt-4 mb-2">
                <span className="text-3xl font-bold text-navy">2 500 €</span>
                <span className="text-gray-500 ml-2">+ opłaty urzędowe</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Wybór formy i nazwy firmy</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Przygotowanie dokumentów rejestracyjnych</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Rejestracja firmy w strefie wolnocłowej</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Uzyskanie licencji biznesowej</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Wirtualne biuro (1 rok)</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onCtaClick}>
                Wybierz pakiet
              </Button>
            </CardContent>
          </Card>

          {/* Premium Package */}
          <Card className="border-gold/30 bg-gradient-to-b from-white to-gold-50 shadow-gold-lg hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1 reveal relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-gold-500 text-white px-4 py-1 text-sm font-medium">
              Najpopularniejszy
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-navy flex items-center">
                <span>Pakiet Premium</span>
                <Star className="h-5 w-5 text-gold-500 ml-2" fill="#d4af69" />
              </CardTitle>
              <p className="text-sm text-gray-500">Kompleksowe rozwiązanie</p>
              <div className="mt-4 mb-2">
                <span className="text-3xl font-bold text-navy">4 500 €</span>
                <span className="text-gray-500 ml-2">+ opłaty urzędowe</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Wszystko z pakietu Podstawowego</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Pomoc w otwarciu konta bankowego</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Uzyskanie 1 wizy rezydencyjnej</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Tłumaczenia dokumentów</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Konsultacja podatkowa (2h)</span>
                </li>
              </ul>
              <Button variant="modern" className="w-full" onClick={onCtaClick}>
                Wybierz pakiet
              </Button>
            </CardContent>
          </Card>

          {/* VIP Package */}
          <Card className="border-gold/20 shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1 reveal">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-bold text-navy">Pakiet VIP</CardTitle>
              <p className="text-sm text-gray-500">Dla wymagających przedsiębiorców</p>
              <div className="mt-4 mb-2">
                <span className="text-3xl font-bold text-navy">7 500 €</span>
                <span className="text-gray-500 ml-2">+ opłaty urzędowe</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Wszystko z pakietu Premium</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Dedykowany opiekun klienta 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Uzyskanie do 3 wiz rezydencyjnych</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Pomoc w znalezieniu biura/mieszkania</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Kompleksowa strategia podatkowa</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" onClick={onCtaClick}>
                Wybierz pakiet
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg border border-gold/10 shadow-gold reveal">
          <h3 className="text-xl font-bold text-navy mb-4">Co dla Ciebie zrobimy:</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gold font-bold">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-navy">Wybór formy i nazwy firmy</h4>
                  <p className="text-gray-500 text-sm">
                    Doradzimy najlepszą strukturę biznesową i pomożemy wybrać nazwę
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gold font-bold">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-navy">Komplet dokumentów + tłumaczenia</h4>
                  <p className="text-gray-500 text-sm">Przygotujemy i przetłumaczymy wszystkie niezbędne dokumenty</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gold font-bold">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-navy">Rejestracja online lub z pełnomocnictwem</h4>
                  <p className="text-gray-500 text-sm">Przeprowadzimy cały proces bez konieczności Twojej obecności</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gold font-bold">4</span>
                </div>
                <div>
                  <h4 className="font-medium text-navy">Konto bankowe</h4>
                  <p className="text-gray-500 text-sm">Pomożemy otworzyć konto w renomowanym banku w Dubaju</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gold font-bold">5</span>
                </div>
                <div>
                  <h4 className="font-medium text-navy">Pomoc w uzyskaniu wizy rezydenta</h4>
                  <p className="text-gray-500 text-sm">
                    Przeprowadzimy Cię przez proces uzyskania wizy dla Ciebie i rodziny
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gold font-bold">6</span>
                </div>
                <div>
                  <h4 className="font-medium text-navy">Wsparcie po rejestracji</h4>
                  <p className="text-gray-500 text-sm">Zapewniamy ciągłe wsparcie w prowadzeniu biznesu w Dubaju</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
