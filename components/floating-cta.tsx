"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

interface FloatingCTAProps {
  onClick?: (e: React.MouseEvent) => void
}

export function FloatingCTA({ onClick }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show the floating CTA after scrolling down a bit
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight && !isDismissed) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  return isVisible ? (
    <div className="fixed bottom-4 right-4 left-4 md:bottom-8 md:right-8 md:left-auto z-50 animate-fade-in-up">
      <Button
        variant="modern"
        size="lg"
        className="w-full md:w-auto px-6 py-5 md:px-8 md:py-6 rounded-md shadow-gold-lg group text-base"
        onClick={onClick}
      >
        <span>Zapisz się na webinar</span>
        <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:translate-x-1" />
      </Button>
    </div>
  ) : null
}
