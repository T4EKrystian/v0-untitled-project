"use client"

import type React from "react"

import { useEffect } from "react"
import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FloatingCTA } from "@/components/floating-cta"
import { HeroSection } from "@/components/sections/hero-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { BusinessTypesSection } from "@/components/sections/business-types-section"
import { SetupProcessSection } from "@/components/sections/setup-process-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"
import { ConsultationPopupForm } from "@/components/consultation-popup-form"
import { SocialProofBar } from "@/components/social-proof-bar"
import { TaxCalculatorSection } from "@/components/sections/tax-calculator-section"
import { ServicePackagesSection } from "@/components/sections/service-packages-section"
import { TeamSection } from "@/components/sections/team-section"

export default function LandingPage() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  // Function to open the form popup
  const openForm = () => {
    setIsFormOpen(true)
  }

  // Function to close the form popup
  const closeForm = () => {
    setIsFormOpen(false)
  }

  // Function to handle CTA clicks
  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault()
    openForm()
  }

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
    <div className="flex min-h-screen flex-col bg-cream text-navy">
      <Header onCtaClick={handleCtaClick} />

      <SocialProofBar />

      <main className="flex-1">
        <HeroSection onCtaClick={handleCtaClick} />
        <BenefitsSection />
        <TaxCalculatorSection onCtaClick={handleCtaClick} />
        <TestimonialsSection />
        <ServicePackagesSection onCtaClick={handleCtaClick} />
        <BusinessTypesSection />
        <TeamSection />
        <SetupProcessSection />
        <FAQSection />
        <FinalCTASection onCtaClick={handleCtaClick} />
      </main>

      <Footer />

      {/* Floating CTA Button */}
      <FloatingCTA onClick={handleCtaClick} />

      {/* Popup Form */}
      <ConsultationPopupForm isOpen={isFormOpen} onClose={closeForm} />
    </div>
  )
}
