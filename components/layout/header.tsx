"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function Header({ onCtaClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 premium-glass transition-all duration-300 ${
        scrolled ? "border-navy/5 shadow-sm" : "border-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <span className="text-lg luxury-heading text-navy">
            Dubai <span className="gradient-text-premium">Invest</span>
          </span>
        </div>

        {/* Nawigacja tylko na desktopie */}
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

        {/* Przycisk CTA tylko na desktopie */}
        <Button variant="modern" className="hidden md:inline-flex" onClick={onCtaClick}>
          Zapisz się na webinar
        </Button>

        {/* Przycisk CTA na mobile */}
        <Button
          variant="minimal"
          size="sm"
          className="md:hidden text-xs px-3 py-1 bg-gold/10 text-navy"
          onClick={onCtaClick}
        >
          Zapisz się
        </Button>
      </div>
    </header>
  )
}
