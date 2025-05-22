"use client"

import { useEffect } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { TestimonialCard } from "@/components/testimonial-card"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Anna Kowalska",
      role: "CEO, Tech Solutions",
      content:
        "Dzięki profesjonalnemu wsparciu zespołu, proces założenia firmy w Dubaju przebiegł sprawnie i bez stresu. Teraz moja firma działa globalnie, a ja korzystam z wszystkich przywilejów podatkowych.",
      isHighlighted: false,
    },
    {
      name: "Jan Nowak",
      role: "Właściciel e-commerce",
      content:
        "Otworzyłem firmę w strefie wolnocłowej w Dubaju. Proces był szybki i przejrzysty. Teraz mój biznes rozwija się międzynarodowo, a ja płacę 0% podatku dochodowego.",
      isHighlighted: false,
    },
    {
      name: "Karol",
      role: "36 lat, Warszawa",
      content:
        "Zdecydowałem się na firmę offshore w Dubaju dla mojego biznesu consultingowego. Cały proces zajął tylko 5 dni. Teraz mogę legalnie optymalizować podatki i działać globalnie.",
      isHighlighted: true,
      metrics: {
        roi: "5 dni",
        timeToRent: "0% podatku",
        location: "Free Zone",
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
          badge="Opinie klientów"
          title={
            <span>
              Co <span className="gradient-text">mówią</span> nasi klienci
            </span>
          }
          description="Poznaj opinie przedsiębiorców, którzy skorzystali z naszych usług i prowadzą teraz biznes w Dubaju"
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
