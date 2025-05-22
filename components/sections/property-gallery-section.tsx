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
      title: "Luksusowy Apartament w Dubai Marina",
      price: "2,500,000 AED",
      location: "Dubai Marina",
      bedrooms: 2,
      bathrooms: 2,
      size: "120 m²",
      description: "Nowoczesny apartament z widokiem na marinę, w pełni umeblowany, z dostępem do basenu i siłowni.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "8.2%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 2,
      title: "Penthouse w Downtown Dubai",
      price: "7,800,000 AED",
      location: "Downtown Dubai",
      bedrooms: 4,
      bathrooms: 5,
      size: "350 m²",
      description: "Ekskluzywny penthouse z widokiem na Burj Khalifa, prywatny taras, luksusowe wykończenie.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.5%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 3,
      title: "Willa na Palm Jumeirah",
      price: "15,000,000 AED",
      location: "Palm Jumeirah",
      bedrooms: 5,
      bathrooms: 6,
      size: "600 m²",
      description: "Luksusowa willa z prywatną plażą, basenem i widokiem na zatokę. Najwyższy standard wykończenia.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "6.8%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 4,
      title: "Apartament w Business Bay",
      price: "1,800,000 AED",
      location: "Business Bay",
      bedrooms: 1,
      bathrooms: 2,
      size: "85 m²",
      description: "Nowoczesny apartament inwestycyjny z wysokim ROI, blisko Dubai Mall i centrum biznesowego.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "9.1%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 5,
      title: "Townhouse w Dubai Hills",
      price: "4,200,000 AED",
      location: "Dubai Hills Estate",
      bedrooms: 3,
      bathrooms: 4,
      size: "220 m²",
      description: "Elegancki szeregowiec w prestiżowej dzielnicy z dostępem do pola golfowego i parków.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.2%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 6,
      title: "Apartament z widokiem na morze",
      price: "3,100,000 AED",
      location: "Jumeirah Beach Residence",
      bedrooms: 3,
      bathrooms: 3,
      size: "180 m²",
      description: "Przestronny apartament z bezpośrednim widokiem na morze, dostępem do prywatnej plaży i udogodnień.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "8.0%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 7,
      title: "Studio w Dubai Sports City",
      price: "550,000 AED",
      location: "Dubai Sports City",
      bedrooms: 0,
      bathrooms: 1,
      size: "45 m²",
      description: "Kompaktowe studio idealne na start lub jako inwestycja z wysokim zwrotem z najmu.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "9.5%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 8,
      title: "Apartament w Jumeirah Village Circle",
      price: "1,200,000 AED",
      location: "Jumeirah Village Circle",
      bedrooms: 2,
      bathrooms: 2,
      size: "110 m²",
      description: "Nowoczesny apartament w spokojnej okolicy z dostępem do basenu i siłowni.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "8.7%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 9,
      title: "Luksusowy Apartament w DIFC",
      price: "5,500,000 AED",
      location: "Dubai International Financial Centre",
      bedrooms: 3,
      bathrooms: 4,
      size: "210 m²",
      description: "Prestiżowy apartament w sercu dzielnicy finansowej z panoramicznym widokiem na miasto.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.0%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 10,
      title: "Apartament w Dubai Creek Harbour",
      price: "2,800,000 AED",
      location: "Dubai Creek Harbour",
      bedrooms: 2,
      bathrooms: 3,
      size: "140 m²",
      description: "Nowoczesny apartament z widokiem na zatokę w nowej, prestiżowej dzielnicy Dubaju.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.8%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 11,
      title: "Willa w Emirates Hills",
      price: "25,000,000 AED",
      location: "Emirates Hills",
      bedrooms: 6,
      bathrooms: 7,
      size: "950 m²",
      description: "Ekskluzywna willa w najbardziej prestiżowej dzielnicy Dubaju z prywatnym ogrodem i basenem.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "5.5%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 12,
      title: "Apartament w Bluewaters Island",
      price: "3,900,000 AED",
      location: "Bluewaters Island",
      bedrooms: 2,
      bathrooms: 3,
      size: "160 m²",
      description: "Luksusowy apartament na sztucznej wyspie z widokiem na Dubai Eye i Zatokę Perską.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.3%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 13,
      title: "Penthouse w Dubai Marina",
      price: "12,000,000 AED",
      location: "Dubai Marina",
      bedrooms: 4,
      bathrooms: 5,
      size: "400 m²",
      description:
        "Spektakularny penthouse z prywatnym tarasem i jacuzzi na dachu oraz panoramicznym widokiem na marinę.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "6.5%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 14,
      title: "Apartament w City Walk",
      price: "4,500,000 AED",
      location: "City Walk",
      bedrooms: 3,
      bathrooms: 3,
      size: "190 m²",
      description: "Nowoczesny apartament w modnej dzielnicy z licznymi restauracjami i sklepami w zasięgu spaceru.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.1%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 15,
      title: "Apartament w The Palm Tower",
      price: "3,200,000 AED",
      location: "Palm Jumeirah",
      bedrooms: 1,
      bathrooms: 2,
      size: "105 m²",
      description:
        "Luksusowy apartament w ikonicznym wieżowcu z dostępem do basenu na dachu i widokiem na całe miasto.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.9%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 16,
      title: "Townhouse w Arabian Ranches",
      price: "3,800,000 AED",
      location: "Arabian Ranches",
      bedrooms: 4,
      bathrooms: 4,
      size: "280 m²",
      description:
        "Przestronny dom szeregowy w spokojnej okolicy z dostępem do pola golfowego i terenów rekreacyjnych.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "6.8%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 17,
      title: "Apartament w Damac Hills",
      price: "1,600,000 AED",
      location: "Damac Hills",
      bedrooms: 2,
      bathrooms: 2,
      size: "115 m²",
      description: "Elegancki apartament z widokiem na pole golfowe w prestiżowej dzielnicy mieszkalnej.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "8.3%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 18,
      title: "Apartament w Meydan",
      price: "2,100,000 AED",
      location: "Meydan",
      bedrooms: 2,
      bathrooms: 3,
      size: "130 m²",
      description: "Nowoczesny apartament z widokiem na tor wyścigowy i panoramę miasta.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.7%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 19,
      title: "Apartament w Dubai South",
      price: "900,000 AED",
      location: "Dubai South",
      bedrooms: 1,
      bathrooms: 1,
      size: "75 m²",
      description: "Przystępny cenowo apartament w rozwijającej się dzielnicy blisko nowego lotniska i Expo City.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "9.0%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
    },
    {
      id: 20,
      title: "Luksusowy Apartament w Jumeirah Lake Towers",
      price: "2,300,000 AED",
      location: "Jumeirah Lake Towers",
      bedrooms: 3,
      bathrooms: 3,
      size: "165 m²",
      description: "Przestronny apartament z widokiem na jeziora i Dubai Marina w popularnej dzielnicy biznesowej.",
      image: "/placeholder.svg?height=600&width=800",
      roi: "7.6%",
      gallery: [
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
        "/placeholder.svg?height=800&width=1200",
      ],
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

  const openLightbox = (propertyIndex, imageIndex = 0) => {
    const property = properties[propertyIndex]
    const imageSrc = imageIndex === 0 ? property.image : property.gallery[imageIndex - 1]
    setLightboxImage(imageSrc)
    setCurrentImageIndex(propertyIndex)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    const property = properties[currentImageIndex]
    const totalImages = property.gallery.length + 1 // Main image + gallery images
    let currentIndex = property.gallery.indexOf(lightboxImage) + 1
    if (lightboxImage === property.image) currentIndex = 0

    currentIndex = (currentIndex + 1) % totalImages
    setLightboxImage(currentIndex === 0 ? property.image : property.gallery[currentIndex - 1])
  }

  const prevImage = () => {
    const property = properties[currentImageIndex]
    const totalImages = property.gallery.length + 1 // Main image + gallery images
    let currentIndex = property.gallery.indexOf(lightboxImage) + 1
    if (lightboxImage === property.image) currentIndex = 0

    currentIndex = (currentIndex - 1 + totalImages) % totalImages
    setLightboxImage(currentIndex === 0 ? property.image : property.gallery[currentIndex - 1])
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
          badge="Ekskluzywne oferty"
          title={
            <span>
              Odkryj <span className="gradient-text-premium">luksusowe</span> nieruchomości w Dubaju
            </span>
          }
          description="Przejrzyj nasze wyselekcjonowane oferty nieruchomości premium w najbardziej pożądanych lokalizacjach"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
          {properties.slice(0, 5).map((property, index) => (
            <div
              key={property.id}
              className={`group relative h-[240px] sm:h-[280px] rounded-xl overflow-hidden shadow-gold hover-lift luxury-frame reveal ${index === 0 ? "md:col-span-2" : ""}`}
              style={{ animationDelay: `${property.id * 0.05}s` }}
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

              <div className="absolute top-4 left-4 bg-gold/90 text-white px-3 py-1 rounded-md text-sm font-medium z-10">
                ROI: {property.roi}
              </div>

              <div className="absolute top-4 right-4 bg-white/90 text-navy px-3 py-1 rounded-md text-sm font-medium z-10 flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 9a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V9z" />
                  <path d="m1 9 9 6 9-6" />
                </svg>
                <span>{property.gallery.length + 1} zdjęć</span>
              </div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-800/60 to-transparent"></div>

              {/* Content at the bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <h3 className="text-xl font-bold mb-2 drop-shadow-md">{property.title}</h3>
                <p className="text-gold-200 text-lg font-semibold mb-3 drop-shadow-md">{property.price}</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  <div className="bg-gold/20 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="font-medium">{property.location}</span>
                  </div>
                  <div className="bg-gold/20 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="font-medium">{property.bedrooms} sypialnie</span>
                  </div>
                  <div className="bg-gold/20 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="font-medium">{property.bathrooms} łazienki</span>
                  </div>
                  <div className="bg-gold/20 backdrop-blur-sm px-2 py-1 rounded">
                    <span className="font-medium">{property.size}</span>
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
                Najwyższe ROI na rynku
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
