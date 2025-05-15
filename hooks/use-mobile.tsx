"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Funkcja sprawdzająca, czy urządzenie jest mobilne
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Sprawdź przy pierwszym renderowaniu
    checkMobile()

    // Dodaj listener na zmianę rozmiaru okna
    window.addEventListener("resize", checkMobile)

    // Cleanup listener przy odmontowaniu komponentu
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
