"use client"

import { useEffect } from "react"
import Image from "next/image"
import { SectionTitle } from "@/components/ui/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Mail } from "lucide-react"

export function TeamSection() {
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

  const team = [
    {
      name: "Anna Kowalska",
      role: "Dyrektor ds. Rejestracji Firm",
      bio: "Ponad 10 lat doświadczenia w zakładaniu firm w Dubaju. Ekspert w strefach wolnocłowych.",
      image: "/confident-consultant.png",
    },
    {
      name: "Jan Nowak",
      role: "Doradca Podatkowy",
      bio: "Certyfikowany doradca podatkowy z 15-letnim doświadczeniem w międzynarodowej optymalizacji podatkowej.",
      image: "/confident-business-advisor.png",
    },
    {
      name: "Marek Wiśniewski",
      role: "Specjalista ds. Wiz i Rezydencji",
      bio: "Ekspert w procesach wizowych i uzyskiwaniu rezydencji w ZEA. Pomógł ponad 200 klientom w przeprowadzce do Dubaju.",
      image: "/confident-middle-eastern-businessman.png",
    },
  ]

  const partners = [
    {
      name: "Dubai Chamber of Commerce",
      logo: "/generic-business-network.png",
    },
    {
      name: "DMCC Free Zone",
      logo: "/dmcc-free-zone-sign.png",
    },
    {
      name: "Emirates NBD",
      logo: "/placeholder.svg?height=100&width=200&query=emirates nbd bank logo",
    },
    {
      name: "Dubai Future Foundation",
      logo: "/placeholder.svg?height=100&width=200&query=dubai future foundation logo",
    },
  ]

  return (
    <section id="team" className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden">
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 top-[10%] left-[10%]"></div>
      <div className="designer-circle w-80 h-80 opacity-10 bottom-[20%] right-[5%]"></div>
      <div className="designer-square w-60 h-60 opacity-10 top-[40%] right-[10%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 left-[15%]"></div>
      <div className="blurred-dots bottom-40 right-[20%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-square w-72 h-72 -top-36 -left-36 rotate-12"></div>
      <div className="geometric-shape geometric-circle w-96 h-96 -bottom-48 -right-48"></div>
      <div className="absolute inset-0 subtle-grid opacity-30"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Nasz zespół"
          title={
            <span>
              Eksperci z <span className="gradient-text-premium">wieloletnim</span> doświadczeniem
            </span>
          }
          description="Poznaj zespół specjalistów, którzy przeprowadzą Cię przez proces założenia firmy w Dubaju"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {team.map((member, index) => (
            <Card
              key={index}
              className="border-gold/20 shadow-gold hover:shadow-gold-lg transition-all duration-300 hover:-translate-y-1 reveal"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-navy">{member.name}</h3>
                  <p className="text-gold-600 text-sm mb-2">{member.role}</p>
                  <p className="text-gray-500 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-2">
                    <a
                      href="#"
                      className="p-2 rounded-full bg-navy-50 text-navy hover:bg-navy-100 transition-colors"
                      aria-label={`LinkedIn profile of ${member.name}`}
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href="#"
                      className="p-2 rounded-full bg-navy-50 text-navy hover:bg-navy-100 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-navy text-center mb-6">Nasi partnerzy i certyfikaty</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md border border-gray-100 flex items-center justify-center h-24 reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={150}
                  height={60}
                  className="object-contain max-h-16"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
