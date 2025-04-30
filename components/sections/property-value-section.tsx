"use client"

import { useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, BarChart3, Percent, DollarSign } from "lucide-react"

export function PropertyValueSection() {
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
      id="property-value"
      className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden"
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
          badge="Wzrost wartości"
          title={
            <span>
              Nieruchomości w Dubaju <span className="gradient-text-premium">rosną szybciej</span> niż w USA i Europie
            </span>
          }
          description="Twoja inwestycja zyskuje na wartości każdego roku - bez podatku od zysków kapitałowych"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8">
          <Card className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium text-white">Wzrost cen w 2023</h3>
              </div>
              <p className="text-3xl font-bold mb-2 text-gold-300">+14,2%</p>
              <p className="text-gray-300/80 text-sm">Średni wzrost cen nieruchomości w Dubaju w 2023 roku</p>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium text-white">W porównaniu do USA</h3>
              </div>
              <p className="text-3xl font-bold mb-2 text-gold-300">3x większy</p>
              <p className="text-gray-300/80 text-sm">Wzrost cen w Dubaju jest około 3 razy szybszy niż w USA</p>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal"
            style={{ animationDelay: "0.2s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <Percent className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium text-white">Zwrot z wynajmu</h3>
              </div>
              <p className="text-3xl font-bold mb-2 text-gold-300">8-10%</p>
              <p className="text-gray-300/80 text-sm">
                Średni roczny zwrot z inwestycji przy wynajmie krótkoterminowym
              </p>
            </CardContent>
          </Card>

          <Card
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 elegant-card hover-lift reveal"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-gold/20 text-gold flex items-center justify-center">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-medium text-white">Prognoza 2025</h3>
              </div>
              <p className="text-3xl font-bold mb-2 text-gold-300">+16,5%</p>
              <p className="text-gray-300/80 text-sm">Przewidywany wzrost cen nieruchomości w Dubaju w 2025 roku</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 sm:mt-10 bg-gradient-to-br from-navy-800/90 to-navy-900 p-4 sm:p-6 md:p-8 rounded-xl border border-gold/30 shadow-gold reveal">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-5 text-center">
            Dlaczego ceny w Dubaju <span className="text-gold-300">rosną szybciej</span>?
          </h3>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold-300 text-sm">1</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Rosnący popyt</span> - Coraz więcej inwestorów i
                    mieszkańców z całego świata wybiera Dubaj
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold-300 text-sm">2</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Brak podatków</span> - Nie płacisz podatku dochodowego
                    ani od zysków kapitałowych
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold-300 text-sm">3</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Stabilność</span> - Bezpieczne i stabilne politycznie
                    środowisko inwestycyjne
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold-300 text-sm">4</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Ograniczona podaż</span> - Limitowana ilość gruntów
                    przy rosnącym popycie
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold-300 text-sm">5</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Turystyka</span> - Ponad 20 milionów turystów rocznie
                    napędza rynek najmu krótkoterminowego
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold-300 text-sm">6</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Prestiż</span> - Nieruchomości w Dubaju to nie tylko
                    inwestycja, ale także symbol statusu
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
