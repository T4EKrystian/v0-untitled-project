"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { useIsMobile } from "@/hooks/use-mobile"

export function DubaiLuxuryGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const isMobile = useIsMobile()

  // Ograniczamy liczbę obrazów na mobile dla lepszej wydajności
  // i używamy obrazów o niższej rozdzielczości dla mobile
  const luxuryImages = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img200.jpg-3DTts0yMsMdTpwZwhptmFcDXubDvuG.jpeg",
      smallSrc: "/images/dubai-marina.png", // Użyj mniejszego obrazu dla mobile
      alt: "Widok z lotu ptaka na sztuczną wyspę Palm Jumeirah w Dubaju",
      description: "Ikoniczna wyspa Palm Jumeirah - architektoniczny cud Dubaju",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10.jpg-bJKta0hHzTYlutT8FIqWNAyzNu67jM.jpeg",
      smallSrc: "/images/palm-jumeirah.png", // Użyj mniejszego obrazu dla mobile
      alt: "Nowoczesne wieżowce mieszkalne w Dubaju",
      description: "Luksusowe apartamentowce z innowacyjną architekturą i zielonymi tarasami",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17.jpg-M0U9NIwseZS8v2kDVhydAECsyP28VZ.jpeg",
      smallSrc: "/images/burj-khalifa.png", // Użyj mniejszego obrazu dla mobile
      alt: "Kompleks mieszkalny z kolorowym placem i terenami zielonymi",
      description: "Nowoczesny kompleks mieszkalny z unikalnymi przestrzeniami publicznymi",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img23.jpg-KpBrgJWavecSq03JSfOLxQgssJnTsf.jpeg",
      smallSrc: "/images/dubai-mall.png", // Użyj mniejszego obrazu dla mobile
      alt: "Luksusowy kompleks mieszkalny nad wodą w Dubaju",
      description: "Ekskluzywne apartamenty z bezpośrednim dostępem do wody i prywatnej plaży",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img90.jpg-2Hj28ngbcSrxibbTeUkUTRvpspgbJ7.jpeg",
      smallSrc: "/images/museum-of-the-future.png", // Użyj mniejszego obrazu dla mobile
      alt: "Apartamentowiec z falującą fasadą przy plaży",
      description: "Innowacyjna architektura z bezpośrednim dostępem do piaszczystej plaży",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/27.jpg-y49BDV14YjFkrD6tmSZOBtzabuHzgZ.jpeg",
      smallSrc: "/images/ain-dubai.png", // Użyj mniejszego obrazu dla mobile
      alt: "Luksusowe apartamenty z widokiem na panoramę Dubaju",
      description: "Apartamenty z basenami na balkonach i spektakularnym widokiem na miasto",
    },
    // Pozostałe obrazy pokazujemy tylko na desktopie
    ...(isMobile
      ? []
      : [
          {
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img171.jpg-aAJFvIjsE4wMlkFoKCA0YZ9AfTlAY8.jpeg",
            smallSrc: "/images/dubai-marina.png",
            alt: "Panorama Dubaju o zachodzie słońca z Burj Khalifa",
            description: "Zapierająca dech w piersiach panorama Dubaju z najwyższym budynkiem świata",
          },
          {
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/0.jpg-R73xuSQOEqOGZes4ofRhtrQQimUpIb.jpeg",
            smallSrc: "/images/dubai-marina.png",
            alt: "Falujący kompleks mieszkalny z ogrodem na dachu",
            description: "Organiczna architektura z rozległymi terenami zielonymi i basenami",
          },
          {
            src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7.jpg-3AvH9pvHFUPo20rnShEFTEoKgpjp7Q.jpeg",
            smallSrc: "/images/dubai-marina.png",
            alt: "Wodospad w luksusowym kompleksie mieszkalnym",
            description: "Spektakularny wodospad w dziedzińcu ekskluzywnego kompleksu mieszkalnego",
          },
        ]),
  ]

  const openLightbox = (index: number) => {
    if (isMobile) return // Na mobile nie otwieramy lightboxa
    setCurrentImage(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % luxuryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + luxuryImages.length) % luxuryImages.length)
  }

  return (
    <section className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden">
      {/* Designer decorative elements - ukryte na mobile dla lepszej wydajności */}
      {!isMobile && (
        <>
          <div className="designer-circle w-96 h-96 opacity-10 top-[10%] right-[10%]"></div>
          <div className="designer-circle w-80 h-80 opacity-10 bottom-[20%] left-[5%]"></div>
          <div className="designer-square w-60 h-60 opacity-10 top-[40%] left-[10%] rotate-12"></div>
          <div className="blurred-dots top-40 right-[15%]"></div>
          <div className="blurred-dots bottom-40 left-[20%]"></div>
          <div className="geometric-shape geometric-square w-72 h-72 -top-36 -right-36 rotate-12"></div>
          <div className="geometric-shape geometric-circle w-96 h-96 -bottom-48 -left-48"></div>
          <div className="absolute inset-0 subtle-grid opacity-30"></div>
        </>
      )}

      <div className="container relative z-10">
        <SectionTitle
          badge="Galeria"
          title={
            <span>
              Odkryj <span className="gradient-text-premium">piękno i luksus</span> Dubaju
            </span>
          }
          description="Zobacz najpiękniejsze i najbardziej ekskluzywne nieruchomości w jednym z najbardziej fascynujących miast świata"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mt-6 sm:mt-8">
          {luxuryImages.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-lg shadow-gold transition-all duration-300 aspect-[4/3] ${
                !isMobile ? "hover:shadow-gold-lg cursor-pointer hover:-translate-y-1" : ""
              }`}
              onClick={isMobile ? undefined : () => openLightbox(index)}
            >
              <div className="absolute inset-0">
                <Image
                  src={isMobile ? image.smallSrc : image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className={`object-cover ${!isMobile ? "transition-transform duration-700 group-hover:scale-110" : ""}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={index < 3 ? "eager" : "lazy"}
                />
              </div>
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-medium text-sm md:text-base">{image.description}</p>
                </div>
              )}
              {isMobile && (
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-800/30 to-transparent flex items-end p-3">
                  <p className="text-white font-medium text-xs">{image.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <p className="text-navy-600 max-w-2xl mx-auto">
            Dubaj to miasto, które nieustannie przesuwa granice architektury i luksusu. Każda nieruchomość to nie tylko
            miejsce do życia, ale również inwestycja w przyszłość i symbol prestiżu.
          </p>
        </div>
      </div>

      {/* Lightbox - tylko dla wersji desktopowej */}
      {!isMobile && lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gold-300 transition-colors z-50"
            aria-label="Zamknij galerię"
          >
            <X className="h-8 w-8" />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gold-300 transition-colors z-50"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gold-300 transition-colors z-50"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight className="h-8 w-8" />
          </button>

          <div className="relative w-full max-h-[80vh] flex flex-col items-center">
            <div className="relative h-full w-full max-w-5xl">
              <Image
                src={luxuryImages[currentImage].src || "/placeholder.svg"}
                alt={luxuryImages[currentImage].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <div className="bg-black/50 backdrop-blur-sm p-4 mt-4 rounded-md max-w-3xl">
              <p className="text-white text-center">{luxuryImages[currentImage].description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
