"use client"

import { useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { Building, Building2, Globe, ShieldCheck } from "lucide-react"

export function BusinessTypesSection() {
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
    <section
      id="business-types"
      className="py-8 sm:py-12 md:py-16 section-dark modern-section relative overflow-hidden"
    >
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
          badge="Rodzaje firm"
          title={
            <span>
              Wybierz <span className="gradient-text-premium">optymalną</span> strukturę dla swojego biznesu
            </span>
          }
          description="Pomożemy Ci wybrać najlepszy typ firmy dopasowany do Twoich potrzeb i celów biznesowych"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
          <Card className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-white">Firma w strefie wolnocłowej (Free Zone)</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300/80">
                  Idealna dla firm, które chcą zachować 100% własności zagranicznej i korzystać z przywilejów
                  podatkowych.
                </p>
                <div className="bg-navy-700/50 p-4 rounded-md">
                  <h4 className="text-gold-300 font-medium mb-2">Główne korzyści:</h4>
                  <ul className="space-y-2 text-gray-300/80">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>100% własności zagranicznej</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>0% podatku dochodowego i od zysków kapitałowych</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>100% repatriacja kapitału i zysków</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Brak ceł importowych w strefie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Uproszczone procedury administracyjne</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-300/80">
                  <span className="text-gold-300 font-medium">Ograniczenia:</span> Działalność ograniczona do strefy
                  wolnocłowej lub handlu międzynarodowego.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-white">Firma na rynku lokalnym (Mainland)</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300/80">
                  Odpowiednia dla firm, które chcą prowadzić działalność na całym terytorium ZEA bez ograniczeń
                  geograficznych.
                </p>
                <div className="bg-navy-700/50 p-4 rounded-md">
                  <h4 className="text-gold-300 font-medium mb-2">Główne korzyści:</h4>
                  <ul className="space-y-2 text-gray-300/80">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Możliwość prowadzenia działalności na całym terytorium ZEA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Brak ograniczeń w handlu z lokalnymi podmiotami</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Możliwość ubiegania się o kontrakty rządowe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Nieograniczona liczba wiz pracowniczych</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Większa elastyczność działalności</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-300/80">
                  <span className="text-gold-300 font-medium">Uwaga:</span> W niektórych sektorach może być wymagany
                  lokalny sponsor lub partner.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-white">Firma offshore</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300/80">
                  Doskonała dla międzynarodowych inwestorów, którzy chcą optymalizować podatki i chronić aktywa.
                </p>
                <div className="bg-navy-700/50 p-4 rounded-md">
                  <h4 className="text-gold-300 font-medium mb-2">Główne korzyści:</h4>
                  <ul className="space-y-2 text-gray-300/80">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Całkowita poufność i prywatność</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>0% podatku dochodowego</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Brak wymogu prowadzenia księgowości</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Minimalne wymogi administracyjne</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Ochrona aktywów</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-300/80">
                  <span className="text-gold-300 font-medium">Ograniczenia:</span> Nie może prowadzić działalności na
                  terenie ZEA.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-medium text-white">Nasze wsparcie</h3>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300/80">
                  Niezależnie od wybranego typu firmy, zapewniamy kompleksowe wsparcie na każdym etapie procesu.
                </p>
                <div className="bg-navy-700/50 p-4 rounded-md">
                  <h4 className="text-gold-300 font-medium mb-2">Co oferujemy:</h4>
                  <ul className="space-y-2 text-gray-300/80">
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Doradztwo w wyborze optymalnej struktury biznesowej</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Kompleksową obsługę procesu rejestracji</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Pomoc w uzyskaniu licencji biznesowej</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Wsparcie w otwarciu konta bankowego</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-gold-300 font-bold">✓</span>
                      <span>Pomoc w uzyskaniu wiz rezydencyjnych</span>
                    </li>
                  </ul>
                </div>
                <p className="text-gray-300/80">
                  Skontaktuj się z nami, aby omówić, która opcja będzie najlepsza dla Twojego biznesu.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
