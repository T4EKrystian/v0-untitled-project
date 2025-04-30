"use client"

import { useEffect } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"
import { Card, CardContent } from "@/components/ui/card"

export function DubaiAttractionsSection() {
  const attractions = [
    {
      id: 1,
      name: "Burj Khalifa",
      description:
        "Najwyższy budynek świata, oferujący zapierające dech w piersiach widoki na całe miasto z platformy widokowej At The Top.",
      image: "/images/burj-khalifa.png",
      location: "Downtown Dubai",
    },
    {
      id: 2,
      name: "Palm Jumeirah",
      description:
        "Sztuczna wyspa w kształcie palmy, dom dla luksusowych hoteli, restauracji i ekskluzywnych nieruchomości z prywatnymi plażami.",
      image: "/images/palm-jumeirah.png",
      location: "Jumeirah",
    },
    {
      id: 3,
      name: "Dubai Marina",
      description:
        "Tętniąca życiem dzielnica z licznymi restauracjami, sklepami i promenadą wzdłuż kanału, idealna na wieczorne spacery.",
      image: "/images/dubai-marina.png",
      location: "Dubai Marina",
    },
    {
      id: 4,
      name: "Dubai Mall",
      description:
        "Jedno z największych centrów handlowych na świecie, z ponad 1200 sklepami, akwarium, lodowiskiem i fontannami Dubai Fountain.",
      image: "/images/dubai-mall.png",
      location: "Downtown Dubai",
    },
    {
      id: 5,
      name: "Museum of the Future",
      description:
        "Futurystyczny budynek prezentujący innowacje technologiczne i wizje przyszłości, uznawany za jeden z najpiękniejszych budynków świata.",
      image: "/images/museum-of-the-future.png",
      location: "Sheikh Zayed Road",
    },
    {
      id: 6,
      name: "Ain Dubai",
      description:
        "Największe koło obserwacyjne na świecie, oferujące panoramiczne widoki na miasto, morze i pustynię z wysokości 250 metrów.",
      image: "/images/ain-dubai.png",
      location: "Bluewaters Island",
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

  return (
    <section id="attractions" className="py-8 sm:py-12 md:py-16 section-dark modern-section relative overflow-hidden">
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 top-[20%] right-[10%]"></div>
      <div className="designer-circle w-80 h-80 opacity-10 bottom-[30%] left-[5%]"></div>
      <div className="designer-square w-60 h-60 opacity-10 top-[40%] left-[10%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 right-[15%]"></div>
      <div className="blurred-dots bottom-40 left-[20%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-triangle w-64 h-64 top-20 -left-32 rotate-12"></div>
      <div className="geometric-shape geometric-circle w-80 h-80 bottom-20 -right-40"></div>
      <div className="absolute inset-0 subtle-dots opacity-20"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Odkryj Dubaj"
          title={
            <span>
              Najbardziej <span className="gradient-text-premium">fascynujące</span> miejsca w Dubaju
            </span>
          }
          description="Poznaj wyjątkowe atrakcje, które czynią Dubaj jednym z najbardziej niezwykłych miast na świecie"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mt-6 sm:mt-8">
          {attractions.map((attraction, index) => (
            <Card
              key={attraction.id}
              className="bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30 overflow-hidden hover-lift card-3d reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 luxury-frame">
                <Image
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.name}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2 text-gold-300">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{attraction.location}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{attraction.name}</h3>
                <p className="text-gray-300/80">{attraction.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 sm:mt-10 bg-gradient-to-br from-navy-800/90 to-navy-900 border-gold/30 p-4 sm:p-6 md:p-8 rounded-xl shadow-gold luxury-border reveal">
          <h3 className="text-2xl font-bold text-white mb-4 text-center">
            Dlaczego warto <span className="gradient-text-premium">odwiedzić Dubaj</span>?
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Całoroczne słońce</span> - średnio 350 słonecznych dni
                    w roku i temperatura zimą około 25°C
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Bezpieczeństwo</span> - jeden z najniższych wskaźników
                    przestępczości na świecie
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Międzynarodowa kuchnia</span> - ponad 12,000
                    restauracji reprezentujących kuchnie z całego świata
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Światowej klasy zakupy</span> - od tradycyjnych souków
                    po luksusowe centra handlowe
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Strategiczna lokalizacja</span> - w zasięgu 8 godzin
                    lotu dla 2/3 światowej populacji
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-gold text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">
                    <span className="font-semibold text-gold-100">Nowoczesna infrastruktura</span> - najnowocześniejsze
                    lotnisko, metro, drogi i usługi publiczne
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
