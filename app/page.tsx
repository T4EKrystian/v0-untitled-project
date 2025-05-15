"use client"

import type React from "react"

import { useEffect } from "react"
import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CountdownTimer } from "@/components/countdown-timer"
import { FloatingCTA } from "@/components/floating-cta"
import { HeroSection } from "@/components/sections/hero-section"
import { WebinarBenefitsSection } from "@/components/sections/webinar-benefits-section"
import { WhyDubaiSection } from "@/components/sections/why-dubai-section"
import { WebinarInfoSection } from "@/components/sections/webinar-info-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { FinalCTASection } from "@/components/sections/final-cta-section"
import { NotForEveryoneSection } from "@/components/sections/not-for-everyone-section"
import { ForWhomSection } from "@/components/sections/for-whom-section"
import { WebinarPopupForm } from "@/components/webinar-popup-form"
import { PropertyGallerySection } from "@/components/sections/property-gallery-section"
import { DubaiAttractionsSection } from "@/components/sections/dubai-attractions-section"
import { PropertyValueSection } from "@/components/sections/property-value-section"
import { InvestmentProcessSection } from "@/components/sections/investment-process-section"
import { SocialProofBar } from "@/components/social-proof-bar"
import { DubaiLuxuryGallery } from "@/components/sections/dubai-luxury-gallery"
import { useIsMobile } from "@/hooks/use-mobile"

export default function LandingPage() {
  const webinarDate = "May 15, 2025 19:00:00"
  const [isFormOpen, setIsFormOpen] = useState(false)
  const isMobile = useIsMobile()

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

  // Add scroll animation with performance optimization
  useEffect(() => {
    // Skip animations on mobile for better performance
    if (isMobile) return

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
        rootMargin: "0px 0px 50px 0px",
      },
    )

    const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-gradient")
    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [isMobile])

  return (
    <div className="flex min-h-screen flex-col bg-cream text-navy">
      <Header onCtaClick={handleCtaClick} />

      {/* Countdown Timer Bar */}
      <div className="bg-gold/5 py-4 border-b border-gold/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="text-center md:text-right">
              <span className="text-navy font-medium">Do najbliższego webinaru pozostało:</span>
            </div>
            <CountdownTimer targetDate={webinarDate} />
          </div>
        </div>
      </div>

      <main className="flex-1">
        <HeroSection onCtaClick={handleCtaClick} />
        <SocialProofBar />
        <PropertyGallerySection />
        <WebinarBenefitsSection onCtaClick={handleCtaClick} />
        <WhyDubaiSection />
        <PropertyValueSection />
        <DubaiLuxuryGallery />
        <DubaiAttractionsSection />
        <InvestmentProcessSection />
        <WebinarInfoSection onCtaClick={handleCtaClick} />
        <ForWhomSection />
        <NotForEveryoneSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection onCtaClick={handleCtaClick} />
      </main>

      <Footer />

      {/* Floating CTA Button */}
      <FloatingCTA onClick={handleCtaClick} />

      {/* Popup Form */}
      <WebinarPopupForm isOpen={isFormOpen} onClose={closeForm} />
    </div>
  )
}
