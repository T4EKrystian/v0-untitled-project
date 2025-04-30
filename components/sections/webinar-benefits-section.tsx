"use client"

import { useEffect } from "react"
import type React from "react"

import { MapPin, CheckCircle, TrendingUp, Coins, Crown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/ui/section-title"
import { FeatureCard } from "@/components/feature-card"

interface WebinarBenefitsSectionProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function WebinarBenefitsSection({ onCtaClick }: WebinarBenefitsSectionProps) {
  const benefits = [
    {
      icon: <MapPin className="h-8 w-8" strokeWidth={1} />,
      title: "Najlepsze lokalizacje inwestycyjne",
      description:
        "Dowiesz się, gdzie inwestuje kapitał zagraniczny i dlaczego właśnie tam powstają najbardziej opłacalne projekty.",
    },
    {
      icon: <CheckCircle className="h-8 w-8" strokeWidth={1} />,
      title: "Aspekty prawne i podatkowe",
      description:
        "Poznasz obowiązujące regulacje, zasady zakupu nieruchomości i dowiesz się, dlaczego w Dubaju nie płacisz podatku dochodowego.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" strokeWidth={1} />,
      title: "Analiza rynku nieruchomości",
      description:
        "Pokażemy, dlaczego ceny w Dubaju rosną szybciej niż w Europie – i które lokalizacje dają największy potencjał wzrostu.",
    },
    {
      icon: <Coins className="h-8 w-8" strokeWidth={1} />,
      title: "Strategie inwestycyjne",
      description:
        'Pokażemy, jak działa najem krótkoterminowy, flipping oraz strategia "kup i trzymaj". Ty wybierasz, co Ci pasuje.',
    },
    {
      icon: <Crown className="h-8 w-8" strokeWidth={1} />,
      title: "Zarządzanie najmem",
      description:
        "Nie musisz mieszkać w Dubaju – pokażemy Ci, jak zarządzać nieruchomością zdalnie, przez sprawdzone firmy.",
    },
    {
      icon: <Globe className="h-8 w-8" strokeWidth={1} />,
      title: "Proces zakupu krok po kroku",
      description:
        "Przejdziemy przez cały proces – jak wygląda transakcja, jakie dokumenty są potrzebne, jakie są koszty i terminy.",
    },
  ]

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
    <section className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden">
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 top-[20%] left-[10%]"></div>
      <div className="designer-circle w-60 h-60 opacity-10 bottom-[15%] right-[15%]"></div>
      <div className="designer-square w-40 h-40 opacity-10 top-[40%] right-[20%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 left-[25%]"></div>
      <div className="blurred-dots bottom-40 right-[10%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-triangle w-64 h-64 top-20 right-20 rotate-45"></div>
      <div className="geometric-shape geometric-circle w-80 h-80 bottom-20 -left-40"></div>
      <div className="absolute inset-0 dot-pattern"></div>
      <div className="absolute inset-0 diagonal-pattern"></div>
      <div className="absolute inset-0 noise-pattern"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Dlaczego warto"
          title={
            <span>
              W <span className="gradient-text">90 minut</span> poznasz konkretne strategie zarabiania na
              nieruchomościach w Dubaju
            </span>
          }
          description="Ten webinar to nie kurs. To 90 minut konkretnej wiedzy o tym, jak inwestować, zarabiać i nie popełniać błędów w Dubaju."
        />

        <div className="max-w-3xl mx-auto mb-8 bg-white p-4 sm:p-6 rounded-md shadow-modern layered-card reveal">
          <h3 className="text-lg sm:text-xl font-light text-gray-900 mb-4">
            Nie musisz mieć doświadczenia ani znać rynku. Ten webinar daje Ci konkretny plan, jak zacząć bezpiecznie –
            jako inwestor lub nabywca prywatny.
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" strokeWidth={1} />
              <span className="text-gray-500">zainwestować i zarabiać pasywnie</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" strokeWidth={1} />
              <span className="text-gray-500">przenieść się do Dubaju i kupić nieruchomość na własne potrzeby</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" strokeWidth={1} />
              <span className="text-gray-500">ochronić kapitał przed inflacją i zdywersyfikować portfel</span>
            </li>
          </ul>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <FeatureCard icon={benefit.icon} title={benefit.title} description={benefit.description} />
            </div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-10 reveal-gradient">
          <Button variant="modern" size="xl" onClick={onCtaClick} className="ultra-premium-button shimmer">
            Zarezerwuj swoje miejsce
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Nie sprzedajemy nieruchomości podczas webinaru – pokazujemy, jak inwestować z głową.
          </p>
        </div>
      </div>
    </section>
  )
}
