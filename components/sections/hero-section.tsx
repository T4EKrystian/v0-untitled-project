"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConsultationForm } from "@/components/consultation-form"

interface HeroSectionProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    {
      src: "/images/burj-khalifa.png",
      alt: "Burj Khalifa - najwyższy budynek świata w Dubaju",
    },
    {
      src: "/images/dubai-marina.png",
      alt: "Dubai Marina - nowoczesna dzielnica biznesowa w Dubaju",
    },
    {
      src: "/images/palm-jumeirah.png",
      alt: "Palm Jumeirah - sztuczna wyspa w kształcie palmy w Dubaju",
    },
    {
      src: "/images/museum-of-the-future.png",
      alt: "Museum of the Future - futurystyczny budynek w Dubaju",
    },
  ]

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [heroImages.length])

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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
  }

  const headline = (() => {
    const variant = Math.floor(Math.random() * 4)
    switch (variant) {
      case 0:
        return "Załóż firmę w Dubaju i płać 0% podatku dochodowego – szybko, bezpiecznie i bez biurokracji"
      case 1:
        return "Twój biznes globalny z Dubaju – 0% podatku, 100% własności i prestiż międzynarodowej marki"
      case 2:
        return "Otwórz firmę w Dubaju w Dubaju w 5 dni – bez podatku dochodowego, z pełną własnością i wsparciem ekspertów"
      case 3:
        return "Biznes w Dubaju – Twoja brama do globalnych rynków bez podatków i z pełną kontrolą nad firmą"
      default:
        return "Załóż firmę w Dubaju i płać 0% podatku dochodowego – szybko, bezpiecznie i bez biurokracji"
    }
  })()

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden section-light pattern-overlay">
      {/* Designer decorative elements */}
      <div className="designer-circle w-80 h-80 opacity-10 top-40 left-20"></div>
      <div className="designer-circle w-60 h-60 opacity-10 bottom-40 right-[35%]"></div>
      <div className="designer-square w-40 h-40 opacity-10 top-[30%] right-20 rotate-12"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-circle w-96 h-96 -top-48 -left-48"></div>
      <div className="geometric-shape geometric-square w-64 h-64 bottom-20 -right-32 rotate-45"></div>
      <div className="absolute inset-0 minimal-grid opacity-30"></div>

      {/* Image slider */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg?height=1080&width=1920&query=dubai+business+skyline"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        {/* Navigation arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 rounded-full p-2 backdrop-blur-sm transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Image indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-gold w-4 sm:w-6" : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-10 pt-6 pb-8 md:pt-10 md:pb-16">
        <div className="grid gap-6 md:gap-10 lg:grid-cols-2 items-center">
          <div className="space-y-4 md:space-y-5 max-w-2xl">
            <div className="modern-badge inline-block mb-2 animate-fade-in-up">
              <span className="designer-dot"></span>
              Kompleksowe wsparcie biznesowe
              <span className="designer-dot"></span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white luxury-heading animate-fade-in-up text-shadow-lg leading-tight">
              <span className="inline-block">Twój</span>{" "}
              <span className="inline-block gradient-text-premium">Globalny</span>{" "}
              <span className="inline-block">Biznes w Dubaju</span>
            </h1>
            <div className="bg-gold/10 border border-gold/20 rounded-md p-3 my-3 animation-delay-100 animate-fade-in-up backdrop-blur-md">
              <p className="text-base md:text-lg font-medium text-white">
                <span className="text-gold-300 font-bold">0% podatku dochodowego</span> i{" "}
                <span className="text-gold-300 font-bold">100% własności</span> firmy dla obcokrajowców
              </p>
            </div>
            <p className="text-base md:text-lg text-white/90 animation-delay-200 animate-fade-in-up">{headline}</p>
            <div className="bg-red-50 border border-red-200 rounded-md p-3 my-3 animation-delay-150 animate-fade-in-up backdrop-blur-md">
              <p className="text-base md:text-lg font-medium text-red-700 flex items-center">
                <span className="inline-block mr-2">🔥</span>
                <span>Tylko do końca kwietnia: rejestracja firmy w 5 dni + darmowe konto bankowe</span>
              </p>
            </div>
            <div className="mt-3 animation-delay-450 animate-fade-in-up">
              <Button
                variant="modern"
                size="xl"
                onClick={onCtaClick}
                className="w-full bg-gold-600 hover:bg-gold-500 group text-base md:text-lg py-4 md:py-5"
              >
                <span>Zarejestruj firmę w 5 dni – zacznij teraz</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            <p className="text-sm text-white/80 italic animation-delay-500 animate-fade-in-up">
              Odpowiemy w ciągu 24 godzin, całkowicie bez zobowiązań
            </p>
            <div className="pt-4 mt-4 md:pt-5 md:mt-5 border-t border-white/10 bg-white/10 backdrop-blur-md rounded-lg p-3 shadow-gold animation-delay-600 animate-fade-in-up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                <div className="text-center card-3d bg-navy-50/20 backdrop-blur-md p-3 rounded-md border border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">500+</p>
                  <p className="text-xs md:text-sm text-white font-medium">Założonych Firm</p>
                </div>
                <div className="text-center card-3d bg-navy-50/20 backdrop-blur-md p-3 rounded-md border border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">5 dni</p>
                  <p className="text-xs md:text-sm text-white font-medium">Średni Czas Rejestracji</p>
                </div>
                <div className="text-center card-3d bg-navy-50/20 backdrop-blur-md p-3 rounded-md border border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">10+</p>
                  <p className="text-xs md:text-sm text-white font-medium">Lat Doświadczenia</p>
                </div>
                <div className="text-center card-3d bg-navy-50/20 backdrop-blur-md p-3 rounded-md border border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">100%</p>
                  <p className="text-xs md:text-sm text-white font-medium">Satysfakcji</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-navy-800 rounded-lg border border-gold/20 shadow-gold lg:hidden animation-delay-650 animate-fade-in-up">
              <h3 className="text-base sm:text-lg text-gold-300 font-semibold mb-2 text-center">
                Dowiedz się, jak NIE płacić podatków
              </h3>
              <ConsultationForm formStyle="dark" simplified={true} />
            </div>
          </div>
          <div className="relative hidden lg:block animation-delay-300 animate-fade-in-up">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-lg bg-gold/20 floating"></div>
            <div className="relative z-10 rounded-2xl gradient-border overflow-hidden shadow-gold-lg transition-all duration-500 hover:border-gold/30 backdrop-blur-md">
              <ConsultationForm formStyle="dark" />
            </div>
            <div
              className="absolute -bottom-6 -right-6 h-32 w-32 rounded-lg bg-gold/20 floating"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
