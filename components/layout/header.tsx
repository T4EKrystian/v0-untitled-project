"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Building2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function Header({ onCtaClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? "hidden" : "auto"
  }

  const handleMobileNavClick = (e: React.MouseEvent) => {
    setMobileMenuOpen(false)
    document.body.style.overflow = "auto"
    if (onCtaClick) {
      onCtaClick(e)
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 premium-glass transition-all duration-300 ${
        scrolled ? "border-navy/5 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center md:justify-between justify-center">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="text-lg luxury-heading text-navy">
            Dubai <span className="gradient-text-premium">Invest</span>
          </span>
        </div>
        <nav className="hidden md:flex gap-8">
          <Link
            href="#why-dubai"
            className="text-sm font-medium transition-colors text-navy hover:text-gold relative group elegant-link"
          >
            Dlaczego Dubaj
          </Link>
          <Link
            href="#webinar"
            className="text-sm font-medium transition-colors text-navy hover:text-gold relative group elegant-link"
          >
            Webinar
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium transition-colors text-navy hover:text-gold relative group elegant-link"
          >
            Opinie
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium transition-colors text-navy hover:text-gold relative group elegant-link"
          >
            FAQ
          </Link>
        </nav>
        <Button variant="modern" className="hidden md:inline-flex" onClick={onCtaClick}>
          Zapisz się na webinar
        </Button>
        <Button
          variant="minimal"
          size="icon"
          className="absolute right-4 md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-16 pb-6 px-4 md:hidden overflow-y-auto">
          <div className="flex flex-col h-full">
            <nav className="flex flex-col gap-4 py-8">
              <Link
                href="#why-dubai"
                className="text-lg font-medium py-3 border-b border-gray-100 text-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dlaczego Dubaj
              </Link>
              <Link
                href="#webinar"
                className="text-lg font-medium py-3 border-b border-gray-100 text-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Webinar
              </Link>
              <Link
                href="#testimonials"
                className="text-lg font-medium py-3 border-b border-gray-100 text-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                Opinie
              </Link>
              <Link
                href="#faq"
                className="text-lg font-medium py-3 border-b border-gray-100 text-navy"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </nav>
            <div className="mt-auto">
              <Button variant="modern" size="lg" className="w-full text-base py-6" onClick={handleMobileNavClick}>
                Zapisz się na webinar
              </Button>
              <p className="text-xs text-center text-gray-500 mt-4">
                Dołącz do ekskluzywnego webinaru i dowiedz się, jak inwestować w Dubaju
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
