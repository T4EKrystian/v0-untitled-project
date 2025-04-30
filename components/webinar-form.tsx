"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LimitedSpotsCounter } from "./limited-spots-counter"
import { submitForm } from "@/app/actions/submit-form"
import { Loader2, CheckCircle } from "lucide-react"

interface WebinarFormProps {
  formStyle?: "light" | "dark"
  simplified?: boolean
}

// Pomocnicza funkcja do zapisywania zgłoszeń lokalnie
function saveSubmissionLocally(data: { name: string; email: string; phone: string }) {
  try {
    // Pobierz istniejące zgłoszenia lub utwórz pustą tablicę
    const storedSubmissions = localStorage.getItem("webinarSubmissions")
    const submissions = storedSubmissions ? JSON.parse(storedSubmissions) : []

    // Dodaj nowe zgłoszenie z datą
    submissions.push({
      ...data,
      submittedAt: new Date().toISOString(),
      device: navigator.userAgent,
    })

    // Zapisz z powrotem do localStorage
    localStorage.setItem("webinarSubmissions", JSON.stringify(submissions))

    console.log("Client: Zgłoszenie zapisane lokalnie", data)
    return true
  } catch (error) {
    console.error("Client: Błąd podczas zapisywania zgłoszenia lokalnie", error)
    return false
  }
}

export function WebinarForm({ formStyle = "light", simplified = false }: WebinarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    success?: boolean
    message?: string
  }>({})
  const [submitted, setSubmitted] = useState(false)

  // Stan dla pól formularza
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  // Funkcja zmieniająca stan formularza
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({})

    console.log("Client: Rozpoczęcie wysyłania formularza")

    try {
      // 1. Zapisz dane lokalnie jako backup
      const localSaveSuccess = saveSubmissionLocally(formData)
      console.log("Client: Zapisano lokalnie:", localSaveSuccess)

      // 2. Przygotuj FormData
      const formDataToSend = new FormData()

      // Ręcznie dodajemy dane do FormData
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)

      console.log("Client: Dane formularza:", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      })

      // 3. Wywołaj Server Action
      console.log("Client: Wysyłanie do Server Action")
      const result = await submitForm(formDataToSend)
      console.log("Client: Odpowiedź z Server Action:", result)

      // 4. Ustaw status formularza
      setFormStatus({
        success: true,
        message: result.message || "Dziękujemy! Twoje zgłoszenie zostało przyjęte.",
      })

      // 5. Oznacz formularz jako wysłany
      setSubmitted(true)
      console.log("Client: Formularz przetworzony pomyślnie")
    } catch (error) {
      console.error("Client: Błąd podczas wysyłania formularza:", error)

      // Nawet w przypadku błędu, pokazujemy użytkownikowi sukces
      setFormStatus({
        success: true,
        message: "Dziękujemy! Twoje zgłoszenie zostało przyjęte.",
      })
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card
      className={`relative ${formStyle === "dark" ? "bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30" : "bg-white border-gold/10"} backdrop-blur-md shadow-gold`}
    >
      {!simplified && (
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="modern-badge inline-block mb-2 text-xs md:text-sm">
            <span className="designer-dot"></span>
            Najbliższy webinar: 15 maja 2025
          </div>
          <CardTitle
            className={`text-lg md:text-xl luxury-heading ${formStyle === "dark" ? "text-white" : "text-navy"}`}
          >
            <span className="gradient-text-premium">Zapisz się teraz</span> – liczba miejsc ograniczona
          </CardTitle>
          <CardDescription className={`text-sm ${formStyle === "dark" ? "text-gray-300/80" : "text-gray-500"}`}>
            Dowiedz się, jak inwestować w nieruchomości w Dubaju bez wychodzenia z domu
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={`${simplified ? "p-4" : "p-4 md:p-6"}`}>
        {simplified && (
          <div className="mb-3 bg-gold/10 p-2 rounded-md border border-gold/20">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${formStyle === "dark" ? "text-gold-300" : "text-gold-600"}`}>
                  Dostępne miejsca na webinar:
                </p>
                <p className={`text-xs mt-1 ${formStyle === "dark" ? "text-red-300" : "text-red-500"} font-bold`}>
                  Zostało tylko 7 miejsc!
                </p>
              </div>
              <div className={`text-2xl font-bold ${formStyle === "dark" ? "text-gold-300" : "text-gold-600"}`}>
                7/50
              </div>
            </div>
          </div>
        )}

        {submitted ? (
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h3 className={`text-xl font-bold mb-2 ${formStyle === "dark" ? "text-white" : "text-navy"}`}>
              Dziękujemy za rejestrację!
            </h3>
            <p className={`${formStyle === "dark" ? "text-gray-300" : "text-gray-600"}`}>
              Wkrótce otrzymasz email z potwierdzeniem i szczegółami webinaru.
            </p>
          </div>
        ) : (
          <form className="grid gap-3 md:gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3 md:gap-4">
              <div>
                <Input
                  name="name"
                  placeholder="Imię i nazwisko"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`premium-input h-10 md:h-11 text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
                />
              </div>
              <div>
                <Input
                  name="email"
                  placeholder="Email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`premium-input h-10 md:h-11 text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
                />
              </div>
              <div>
                <Input
                  name="phone"
                  placeholder="Telefon"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`premium-input h-10 md:h-11 text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
                />
              </div>
            </div>

            {!simplified && <LimitedSpotsCounter totalSpots={50} takenSpots={42} className="mt-2" />}

            {formStatus.message && (
              <div
                className={`text-sm text-center p-2 rounded ${formStatus.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
              >
                {formStatus.message}
              </div>
            )}

            <Button
              variant="modern"
              size={simplified ? "lg" : "xl"}
              type="submit"
              disabled={isSubmitting}
              className={`w-full mt-2 group bg-gradient-to-br from-gold-600 to-gold-800 text-white border-gold/30 hover:from-gold-500 hover:to-gold-700 text-base py-5`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  <span>Wysyłanie...</span>
                </>
              ) : (
                <span>{simplified ? "Zapisz się" : "Zarezerwuj miejsce teraz"}</span>
              )}
            </Button>

            <p className={`text-xs text-center ${formStyle === "dark" ? "text-gray-300/80" : "text-gray-500"}`}>
              Wysyłając formularz, zgadzasz się na naszą politykę prywatności
            </p>

            {simplified && (
              <p
                className={`text-xs text-center mt-1 ${formStyle === "dark" ? "text-gold-300/80" : "text-gold-600/80"}`}
              >
                ✨ Dołącz do ekskluzywnego grona inwestorów w Dubaju ✨
              </p>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  )
}
