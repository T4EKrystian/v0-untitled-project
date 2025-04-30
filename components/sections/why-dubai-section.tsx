"use client"

import { useEffect } from "react"
import { MapPin, CheckCircle, TrendingUp, Building2, Shield, Users, Percent, Home, Briefcase } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"

export function WhyDubaiSection() {
  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8" strokeWidth={1} />,
      title: "Brak podatku dochodowego",
      description: "Zachowujesz 100% swoich zysków – legalnie. Bez podatku od dochodu, najmu ani sprzedaży.",
    },
    {
      icon: <Building2 className="h-8 w-8" strokeWidth={1} />,
      title: "Stabilność gospodarcza",
      description:
        "Dubaj to jedno z najbezpieczniejszych i najlepiej zarządzanych miejsc na Bliskim Wschodzie, z gospodarką opartą na różnorodnych sektorach.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" strokeWidth={1} />,
      title: "Szybki wzrost wartości",
      description:
        "W 2023 ceny mieszkań w Dubaju rosły szybciej niż w Londynie, Berlinie, czy Warszawie. A do tego nie płacisz podatku od zysków.",
    },
    {
      icon: <MapPin className="h-8 w-8" strokeWidth={1} />,
      title: "Nowoczesna infrastruktura",
      description:
        "Dubaj ma jeden z najlepszych systemów transportowych, lotnisk i sieci komunikacyjnych. Inwestuje w smart cities, AI i zielone technologie.",
    },
    {
      icon: <Shield className="h-8 w-8" strokeWidth={1} />,
      title: "Bezpieczeństwo inwestycji",
      description:
        "Silne prawo własności, niski wskaźnik przestępczości, szybkie procesy prawne – Dubaj chroni kapitał.",
    },
    {
      icon: <Briefcase className="h-8 w-8" strokeWidth={1} />,
      title: "Łatwość prowadzenia biznesu",
      description:
        "Dubaj zajmuje wysokie miejsce w rankingach łatwości prowadzenia biznesu. Procedury administracyjne są uproszczone i zdigitalizowane.",
    },
    {
      icon: <Users className="h-8 w-8" strokeWidth={1} />,
      title: "Międzynarodowe środowisko",
      description:
        "Ponad 85% mieszkańców to ekspatrianci. Dubaj jest kosmopolitycznym centrum, które przyciąga talenty i inwestorów z całego świata.",
    },
    {
      icon: <Percent className="h-8 w-8" strokeWidth={1} />,
      title: "Wysoka stopa zwrotu",
      description: "Wynajmy krótkoterminowe generują nawet 8–12% ROI. Bez podatku, bez komplikacji.",
    },
    {
      icon: <Home className="h-8 w-8" strokeWidth={1} />,
      title: "Komfort życia i jakość codzienności",
      description:
        "Dubaj to nowoczesne, bezpieczne miasto z rozwiniętą infrastrukturą, prywatną służbą zdrowia, międzynarodowymi szkołami i wysokim standardem życia. Coraz więcej Europejczyków wybiera to miejsce jako nowy dom.",
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
    <section id="why-dubai" className="py-8 sm:py-12 md:py-16 relative overflow-hidden section-dark modern-section">
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
          badge="Fakty i liczby"
          title={
            <span>
              Dlaczego Dubaj to <span className="gradient-text">najlepsza</span> destynacja inwestycyjna?
            </span>
          }
          description="Poznaj kluczowe powody, dla których inwestorzy z całego świata wybierają Dubaj"
          className="mb-6"
        />

        <h3 className="text-lg sm:text-xl luxury-heading text-center mb-6 text-gray-800 reveal">
          <span className="designer-dash"></span>8 powodów, dla których inwestorzy i klienci prywatni wybierają Dubaj
          zamiast Londynu, Berlina czy Warszawy
          <span className="designer-dash"></span>
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-8 mb-12">
          {[
            { value: "15+", label: "Lat Doświadczenia" },
            { value: "500+", label: "Zadowolonych Klientów" },
            { value: "200+", label: "Luksusowych Nieruchomości" },
            { value: "100%", label: "Satysfakcji" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-navy/80 backdrop-blur-sm rounded-lg p-4 text-center shadow-gold flex flex-col items-center justify-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base font-medium text-white">{stat.label}</div>
            </div>
          ))}
        </div>

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
