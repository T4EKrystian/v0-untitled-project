"use client"

import { useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { TestimonialCard } from "@/components/testimonial-card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "Inwestor",
      content:
        "Dzięki wiedzy zdobytej na webinarze, zainwestowałam w apartament w Palm Jumeirah. Proces przebiegł sprawnie i bez stresu. Polecam!",
      isHighlighted: false,
    },
    {
      name: "Jan Nowak",
      role: "Przedsiębiorca",
      content:
        "Zainwestowałem w dwie nieruchomości w Dubai Marina. Stopa zwrotu przekroczyła moje oczekiwania. Świetna obsługa i doradztwo.",
      isHighlighted: false,
    },
    {
      name: "Karol",
      role: "36 lat, Poznań",
      content:
        "Dzięki wsparciu Adama Nowaka zainwestowałem z myślą o pasywnym dochodzie. Cały proces zdalny. Po 2 miesiącach miałem najemcę i 9% ROI netto. Polecam każdemu, kto szuka konkretu.",
      isHighlighted: true,
      metrics: {
        roi: "9,1%",
        timeToRent: "2 miesiące",
        location: "Business Bay",
      },
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
    <section id="testimonials" className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden">
      {/* Designer decorative elements */}
      <div className="designer-circle w-80 h-80 opacity-10 top-[20%] right-[10%]"></div>
      <div className="designer-square w-60 h-60 opacity-10 bottom-[30%] left-[5%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-20 left-[20%]"></div>
      <div className="blurred-dots bottom-20 right-[15%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-circle w-80 h-80 -top-40 -right-40"></div>
      <div className="absolute inset-0 subtle-dots"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Opinie uczestników"
          title={
            <span>
              Co <span className="gradient-text">mówią</span> nasi inwestorzy
            </span>
          }
          description="Poznaj opinie osób, które zaufały naszemu doświadczeniu i zainwestowały w Dubaju"
        />

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`reveal ${index === 1 ? "lg:translate-y-6" : ""}`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <TestimonialCard
                name={testimonial.name}
                role={testimonial.role}
                content={testimonial.content}
                isHighlighted={testimonial.isHighlighted}
                metrics={testimonial.metrics}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
