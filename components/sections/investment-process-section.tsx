"use client"

import { useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"

export function InvestmentProcessSection() {
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

  const steps = [
    {
      number: "01",
      title: "Zostaw kontakt – oddzwonimy w 24h",
      description:
        "Porozmawiamy o Twoich oczekiwaniach i celach. Już podczas pierwszej rozmowy otrzymasz konkretne propozycje i wstępną analizę opłacalności.",
    },
    {
      number: "02",
      title: "Wybierz idealną nieruchomość",
      description:
        "Przedstawimy Ci wyselekcjonowane oferty dopasowane do Twoich potrzeb. Zorganizujemy wirtualny spacer lub osobistą wizytę w wybranych nieruchomościach.",
    },
    {
      number: "03",
      title: "Bezpieczna rezerwacja i umowa",
      description:
        "Zajmiemy się wszystkimi formalnościami. Nasz zespół prawny zadba o Twoje bezpieczeństwo na każdym etapie transakcji.",
    },
    {
      number: "04",
      title: "Wygodne finansowanie i płatności",
      description:
        "Pomożemy Ci uzyskać najlepsze warunki finansowania. Wynegocjujemy korzystne terminy płatności i rabaty od deweloperów.",
    },
    {
      number: "05",
      title: "Szybka finalizacja zakupu",
      description:
        "Przeprowadzimy Cię przez cały proces finalizacji, abyś jak najszybciej mógł cieszyć się swoją nową nieruchomością w Dubaju.",
    },
    {
      number: "06",
      title: "Bezproblemowe zarządzanie i zyski",
      description:
        "Zajmiemy się wszystkim - od znalezienia najemców po codzienne zarządzanie. Ty tylko odbierasz przelewy i cieszysz się zyskami.",
    },
  ]

  // Update the section padding and spacing between elements
  return (
    <section
      id="investment-process"
      className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden"
    >
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 top-[20%] right-[10%]"></div>
      <div className="designer-circle w-80 h-80 opacity-10 bottom-[30%] left-[5%]"></div>
      <div className="designer-square w-60 h-60 opacity-10 top-[40%] left-[10%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 right-[15%]"></div>
      <div className="blurred-dots bottom-40 left-[20%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-triangle w-64 h-64 top-20 -left-32 rotate-12"></div>
      <div className="geometric-shape geometric-circle w-80 h-80 bottom-20 -right-40"></div>
      <div className="absolute inset-0 subtle-dots opacity-20"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Proces inwestycyjny"
          title={
            <span>
              Jak <span className="gradient-text-premium">wspólnie zrealizujemy</span> Twoją inwestycję w Dubaju?
            </span>
          }
          description="Przeprowadzimy Cię przez cały proces - od pierwszej rozmowy aż po zarządzanie Twoją nieruchomością"
        />

        <div className="mt-8 sm:mt-10 relative">
          {/* Timeline line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gold/20 -translate-x-1/2 z-0"></div>

          <div className="space-y-8 md:space-y-16 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-4 sm:gap-6 reveal`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-full bg-white border border-gold/20 flex items-center justify-center text-gold font-bold text-xl z-10 shrink-0">
                  {step.number}
                </div>
                <div
                  className={`bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 p-4 sm:p-5 rounded-xl shadow-gold w-full md:w-[calc(50%-3.5rem)] luxury-border ${
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gold-100 mb-2">{step.title}</h3>
                  <p className="text-gray-300/80 text-sm sm:text-base">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 sm:mt-12 text-center reveal">
          <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4">
            Gotowy na rozpoczęcie swojej przygody z <span className="gradient-text-premium">Dubajem</span>?
          </h3>
          <p className="text-navy-light/70 max-w-2xl mx-auto mb-6">
            Nasz zespół ekspertów czeka, by pomóc Ci zrealizować marzenie o własnej nieruchomości w Dubaju. Zapisz się
            na webinar i dowiedz się więcej!
          </p>
        </div>
      </div>
    </section>
  )
}
