"use client"

import { useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { Percent, Globe, Clock, Award, Layers, Briefcase, DollarSign, Shield, Home, Lightbulb } from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: <Percent className="h-8 w-8" strokeWidth={1} />,
      title: "Brak podatku dochodowego",
      description:
        "0% podatku osobistego i dochodowego od firm w wielu przypadkach. Dopiero od 2023 wprowadzono 9% podatek korporacyjny, ale tylko dla dochodów powyżej 375,000 AED (ok. 100,000 USD).",
    },
    {
      icon: <Briefcase className="h-8 w-8" strokeWidth={1} />,
      title: "100% własności firmy",
      description:
        "W wielu sektorach (w tym w strefach wolnocłowych) możesz być jedynym właścicielem firmy – bez potrzeby lokalnego sponsora. Masz pełną kontrolę nad zyskami i decyzjami.",
    },
    {
      icon: <Clock className="h-8 w-8" strokeWidth={1} />,
      title: "Szybki proces rejestracji",
      description:
        "Można założyć firmę nawet w 2–5 dni roboczych. Wiele procedur odbywa się online – bez konieczności fizycznej obecności.",
    },
    {
      icon: <Award className="h-8 w-8" strokeWidth={1} />,
      title: "Reputacja i prestiż",
      description:
        "Dubaj to globalne centrum biznesowe – obecność w tym miejscu buduje zaufanie i prestiż marki. Idealne miejsce do prowadzenia biznesu międzynarodowego.",
    },
    {
      icon: <Layers className="h-8 w-8" strokeWidth={1} />,
      title: "Elastyczność form działalności",
      description:
        "Możliwość rejestracji w strefie wolnocłowej (Free Zone) z przywilejami podatkowymi lub na rynku lokalnym (Mainland) bez ograniczeń w Emiratach.",
    },
    {
      icon: <Globe className="h-8 w-8" strokeWidth={1} />,
      title: "Dostęp do globalnego rynku",
      description:
        "Dubaj to brama do Bliskiego Wschodu, Azji, Afryki i Europy. Świetna infrastruktura: porty, lotniska, logistyka, Internet.",
    },
    {
      icon: <DollarSign className="h-8 w-8" strokeWidth={1} />,
      title: "Brak ograniczeń walutowych",
      description:
        "Pełna swoboda w transferach kapitału i zysków za granicę. Możliwość prowadzenia konta w dirhamach, dolarach i euro.",
    },
    {
      icon: <Shield className="h-8 w-8" strokeWidth={1} />,
      title: "Stabilność polityczna i gospodarcza",
      description:
        "Emiraty są jednym z najbezpieczniejszych i najbardziej rozwiniętych państw w regionie. Stabilna waluta (dirham powiązany z dolarem USA), niskie ryzyko inflacji.",
    },
    {
      icon: <Home className="h-8 w-8" strokeWidth={1} />,
      title: "Wysoka jakość życia",
      description:
        "Luksusowe życie, dobra opieka zdrowotna, międzynarodowe szkoły. Możliwość uzyskania rezydencji (wiza biznesowa) dla Ciebie i Twojej rodziny.",
    },
    {
      icon: <Lightbulb className="h-8 w-8" strokeWidth={1} />,
      title: "Wsparcie dla startupów i innowacji",
      description:
        "Inicjatywy takie jak Dubai Future Foundation, In5 Tech Hubs, programy dotacyjne i mentoringowe. Świetne miejsce dla biznesów z branży technologicznej.",
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
    <section id="benefits" className="py-8 sm:py-12 md:py-16 relative overflow-hidden section-dark modern-section">
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 top-[10%] right-[10%]"></div>
      <div className="designer-circle w-80 h-80 opacity-10 bottom-[20%] left-[5%]"></div>
      <div className="designer-square w-60 h-60 opacity-10 top-[40%] left-[10%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 right-[15%]"></div>
      <div className="blurred-dots bottom-40 left-[20%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-square w-72 h-72 -top-36 -right-36 rotate-12"></div>
      <div className="geometric-shape geometric-circle w-96 h-96 -bottom-48 -left-48"></div>
      <div className="absolute inset-0 subtle-grid opacity-30"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Dlaczego Dubaj"
          title={
            <span>
              10 kluczowych <span className="gradient-text">korzyści</span> z prowadzenia biznesu w Dubaju
            </span>
          }
          description="Poznaj powody, dla których przedsiębiorcy z całego świata wybierają Dubaj jako miejsce dla swojego biznesu"
          className="mb-6"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 stagger-children">
          {benefits.map((benefit, index) => (
            <div key={index} className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <div className="bg-white border border-gold/20 rounded-lg p-4 sm:p-5 h-full shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    {benefit.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-navy">{benefit.title}</h3>
                </div>
                <p className="text-navy-light/80 text-sm sm:text-base">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
