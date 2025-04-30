"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WebinarForm } from "@/components/webinar-form"

interface HeroSectionProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function HeroSection({ onCtaClick }: HeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img41.jpg-uQXO1KG2OJT1m5hSAJ6K5Vyp1OUIXj.jpeg",
      alt: "Luxury beachfront development in Dubai with pristine sandy beaches and turquoise waters",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img12.jpg-r1RAI48y37Y7EBtoPPewDhUwoCpLF9.jpeg",
      alt: "Dubai skyline during daytime featuring Burj Khalifa and modern skyscrapers along the canal",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img8.jpg-v3VxShgZW7UqhpIgRis695oxjontHO.jpeg",
      alt: "Dubai skyline at night with illuminated Burj Khalifa and city lights",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img16.jpg-qJPUVcY7ZXGElPlPYRPWsEb1BkkxVA.jpeg",
      alt: "Futuristic Dubai cityscape with Burj Khalifa and air taxi",
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
        return "Zainwestuj w Dubaju i zacznij zarabiać jak inwestor z Zatoki – bez podatków, z pełną własnością i wysokim ROI"
      case 1:
        return "Zarabiaj w AED i USD – z wynajmu krótkoterminowego i wzrostu wartości, bez podatków i zbędnych formalności"
      case 2:
        return "Zarabiaj w AED i USD albo mieszkaj w jednym z najnowocześniejszych miast świata – z pełną własnością, bez podatków i biurokracji"
      case 3:
        return "Kup lub zainwestuj w Dubaju – bez podatków, z pełną własnością i wzrostem wartości szybszym niż w Europie"
      default:
        return "Zainwestuj w Dubaju i zacznij zarabiać jak inwestor z Zatoki – bez podatków, z pełną własnością i wysokim ROI"
    }
  })()

  return (
    <section className="relative min-h-[80vh] md:min-h-screen flex items-center overflow-hidden section-light pattern-overlay">
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
              src={image.src || "/placeholder.svg"}
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
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 rounded-full p-1 sm:p-2 backdrop-blur-sm transition-all duration-300"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 rounded-full p-1 sm:p-2 backdrop-blur-sm transition-all duration-300"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </button>

        {/* Image indicators - hidden on mobile */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-gold w-6" : "bg-white/50 hover:bg-white"
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
              Ekskluzywny webinar
              <span className="designer-dot"></span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white luxury-heading animate-fade-in-up text-shadow-lg leading-tight">
              <span className="inline-block">Twój</span>{" "}
              <span className="inline-block gradient-text-premium">Luksusowy</span>{" "}
              <span className="inline-block">Dom w Dubaju</span>
            </h1>
            <div className="bg-gold/10 border border-gold/20 rounded-md p-3 my-3 animation-delay-100 animate-fade-in-up backdrop-blur-md">
              <p className="text-base md:text-lg font-medium text-white">
                <span className="text-gold-300 font-bold">14,2% wzrostu</span> wartości nieruchomości w 2023 roku –
                <span className="text-gold-300 font-bold"> 3x więcej</span> niż w Europie i USA
              </p>
            </div>
            <p className="text-base md:text-lg text-white/90 animation-delay-200 animate-fade-in-up">
              Ekskluzywne nieruchomości w najbardziej prestiżowych lokalizacjach, dopasowane do Twoich preferencji i
              oczekiwań. Zarabiaj na inwestycji lub zabezpiecz kapitał.
            </p>
            <div className="mt-3 animation-delay-450 animate-fade-in-up">
              <Button
                variant="modern"
                size="xl"
                onClick={onCtaClick}
                className="w-full bg-gold-600 hover:bg-gold-500 group text-base md:text-lg py-4 md:py-5"
              >
                <span>Zapisz się na webinar teraz</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
            <p className="text-sm text-white/80 italic animation-delay-500 animate-fade-in-up">
              Odpowiemy w ciągu 24 godzin, całkowicie bez zobowiązań
            </p>
            <div className="pt-3 mt-3 md:pt-5 md:mt-5 border-t border-white/10 bg-navy-900/60 backdrop-blur-md rounded-lg p-3 shadow-gold animation-delay-600 animate-fade-in-up">
              <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                <div className="text-center bg-navy-800/90 p-2 rounded-md border border-gold/30 hover:border-gold/50 transition-all duration-300 flex flex-col justify-center items-center">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">15+</p>
                  <p className="text-xs md:text-sm text-white font-medium">Lat Doświadczenia</p>
                </div>
                <div className="text-center bg-navy-800/90 p-2 rounded-md border border-gold/30 hover:border-gold/50 transition-all duration-300 flex flex-col justify-center items-center">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">500+</p>
                  <p className="text-xs md:text-sm text-white font-medium">Klientów</p>
                </div>
                <div className="text-center bg-navy-800/90 p-2 rounded-md border border-gold/30 hover:border-gold/50 transition-all duration-300 flex flex-col justify-center items-center">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">200+</p>
                  <p className="text-xs md:text-sm text-white font-medium">Nieruchomości</p>
                </div>
                <div className="text-center bg-navy-800/90 p-2 rounded-md border border-gold/30 hover:border-gold/50 transition-all duration-300 flex flex-col justify-center items-center">
                  <p className="text-xl md:text-2xl font-bold text-gold-300 text-shadow-gold">100%</p>
                  <p className="text-xs md:text-sm text-white font-medium">Satysfakcji</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 sm:p-4 bg-navy-800/80 backdrop-blur-md rounded-lg border border-gold/20 shadow-gold lg:hidden animation-delay-650 animate-fade-in-up">
              <h3 className="text-base sm:text-lg text-gold-300 font-semibold mb-2 text-center">
                Zapisz się na webinar
              </h3>
              <WebinarForm formStyle="dark" simplified={true} />
            </div>
          </div>
          <div className="relative hidden lg:block animation-delay-300 animate-fade-in-up">
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-lg bg-gold/20 floating"></div>
            <div className="relative z-10 rounded-2xl gradient-border overflow-hidden shadow-gold-lg transition-all duration-500 hover:border-gold/30 backdrop-blur-md">
              <WebinarForm formStyle="dark" />
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
