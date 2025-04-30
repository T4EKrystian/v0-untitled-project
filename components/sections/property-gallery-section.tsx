"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/section-title"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export function PropertyGallerySection() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState("")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const properties = [
    {
      id: 1,
      title: "Ellington House",
      location: "Dubai Marina",
      image: "/images/ellington-house.jpeg",
    },
    {
      id: 2,
      title: "Rosemont Residences",
      location: "Downtown Dubai",
      image: "/images/rosemont-residences.jpeg",
    },
    {
      id: 3,
      title: "Ellington Views",
      location: "Palm Jumeirah",
      image: "/images/ellington-views.jpeg",
    },
    {
      id: 4,
      title: "Luxury Townhouses",
      location: "Dubai Hills Estate",
      image: "/images/luxury-townhouses.jpeg",
    },
    {
      id: 5,
      title: "Art Bay",
      location: "Business Bay",
      image: "/images/art-bay.jpeg",
    },
    {
      id: 6,
      title: "Costa Mare",
      location: "Jumeirah Beach Residence",
      image: "/images/costa-mare.jpeg",
    },
    {
      id: 7,
      title: "Claydon House",
      location: "Dubai Sports City",
      image: "/images/claydon-house.jpeg",
    },
    {
      id: 8,
      title: "Belgravia Gardens",
      location: "Jumeirah Village Circle",
      image: "/images/belgravia-gardens.jpeg",
    },
    {
      id: 9,
      title: "Belgravia Square",
      location: "Dubai International Financial Centre",
      image: "/images/belgravia-square-pool.jpeg",
    },
    {
      id: 10,
      title: "Arbor View",
      location: "Dubai Creek Harbour",
      image: "/images/arbor-view-exterior.jpeg",
    },
    {
      id: 11,
      title: "Arbor Residences",
      location: "Emirates Hills",
      image: "/images/arbor-view-caravan.jpeg",
    },
    {
      id: 12,
      title: "Palm Terraces",
      location: "Palm Jumeirah",
      image: "/images/costa-mare.jpeg",
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

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right")
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const openLightbox = (index) => {
    setLightboxImage(properties[index].image)
    setCurrentImageIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % properties.length)
    setLightboxImage(properties[(currentImageIndex + 1) % properties.length].image)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + properties.length) % properties.length)
    setLightboxImage(properties[(currentImageIndex - 1 + properties.length) % properties.length].image)
  }

  return (
    <section id="properties" className="py-8 sm:py-12 md:py-16 section-dark modern-section relative overflow-hidden">
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
          badge="Ekskluzywne inwestycje"
          title={
            <span>
              Odkryj <span className="gradient-text-premium">luksusowe</span> inwestycje w Dubaju
            </span>
          }
          description="Przejrzyj nasze wyselekcjonowane oferty inwestycyjne premium w najbardziej pożądanych lokalizacjach"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="group relative h-[240px] sm:h-[280px] rounded-xl overflow-hidden shadow-gold hover-lift luxury-frame reveal"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => openLightbox(index)}
            >
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 via-navy-800/30 to-transparent"></div>

              {/* Content at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h3 className="text-xl font-bold mb-2 drop-shadow-md">{property.title}</h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="bg-gold/20 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="font-medium">{property.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-10">
          <div
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 rounded-xl overflow-hidden shadow-gold luxury-border hover-lift reveal elegant-card"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="p-6">
              <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center luxury-heading">
                Najwyższe ROI na rynku inwestycyjnym
              </h3>
              <div className="h-px w-16 bg-gold/20 mx-auto mb-4"></div>
              <p className="text-gray-300/80 text-center">
                Nieruchomości w Dubaju oferują średnio 7-10% zwrotu z inwestycji rocznie, znacznie więcej niż w Europie
                czy USA.
              </p>
            </div>
          </div>

          <div
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 rounded-xl overflow-hidden shadow-gold luxury-border hover-lift reveal elegant-card"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="p-6">
              <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                  <path d="M2 7h20" />
                  <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
                  <path d="M6 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center luxury-heading">
                Pełna własność dla cudzoziemców
              </h3>
              <div className="h-px w-16 bg-gold/20 mx-auto mb-4"></div>
              <p className="text-gray-300/80 text-center">
                W przeciwieństwie do wielu krajów, Dubaj oferuje pełne prawo własności dla inwestorów zagranicznych.
              </p>
            </div>
          </div>

          <div
            className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 rounded-xl overflow-hidden shadow-gold luxury-border hover-lift reveal elegant-card"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="p-6">
              <div className="h-16 w-16 rounded-full bg-gold/10 flex items-center justify-center mb-4 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gold"
                >
                  <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1" />
                  <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1" />
                  <path d="M12 18v4" />
                  <path d="M8 18v4" />
                  <path d="M16 18v4" />
                  <path d="M3 14h18" />
                  <rect x="5" y="6" width="14" height="8" rx="1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 text-center luxury-heading">
                Zarządzanie najmem bez stresu
              </h3>
              <div className="h-px w-16 bg-gold/20 mx-auto mb-4"></div>
              <p className="text-gray-300/80 text-center">
                Oferujemy kompleksowe usługi zarządzania najmem, dzięki czemu możesz cieszyć się zyskami bez codziennych
                obowiązków.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gold-300 transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <button onClick={prevImage} className="absolute left-4 text-white hover:text-gold-300 transition-colors">
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button onClick={nextImage} className="absolute right-4 text-white hover:text-gold-300 transition-colors">
            <ChevronRight className="h-8 w-8" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full h-full">
            <Image
              src={lightboxImage || "/placeholder.svg"}
              alt="Property image"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
        </div>
      )}
    </section>
  )
}
