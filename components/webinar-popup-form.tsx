"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, Users } from "lucide-react"
import { WebinarForm } from "./webinar-form"

export function WebinarPopupForm() {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    // Sprawdź czy popup już był pokazany w tej sesji
    const popupShown = sessionStorage.getItem("webinarPopupShown")
    if (popupShown) {
      setHasShown(true)
      return
    }

    // Pokaż popup po 30 sekundach
    const timer = setTimeout(() => {
      if (!hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem("webinarPopupShown", "true")
      }
    }, 30000)

    return () => clearTimeout(timer)
  }, [hasShown])

  // Pokaż popup przy próbie opuszczenia strony
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
        sessionStorage.setItem("webinarPopupShown", "true")
      }
    }

    document.addEventListener("mouseleave", handleMouseLeave)
    return () => document.removeEventListener("mouseleave", handleMouseLeave)
  }, [hasShown])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Ostatnie miejsca!
            </div>

            <h2 className="text-2xl font-bold text-navy mb-2">Nie przegap tej okazji!</h2>

            <p className="text-gray-600 mb-4">
              Webinar: <strong>Jak skutecznie inwestować w nieruchomości w Dubaju?</strong>
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                27 lipca 2025
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                19:30
              </div>
            </div>
          </div>

          <WebinarForm formStyle="light" simplified={true} />
        </div>
      </div>
    </div>
  )
}
