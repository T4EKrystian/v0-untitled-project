"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LimitedSpotsCounter } from "./limited-spots-counter"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"

interface WebinarFormProps {
  formStyle?: "light" | "dark"
  simplified?: boolean
}

// Funkcja do wysyłania danych przez API route
async function sendToWebinarAPI(data: { name: string; email: string; phone: string }) {
  try {
    console.log("Client: Wysyłanie przez API route")

    const response = await fetch("/api/webinar-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    const result = await response.json()
    console.log("Client: API response:", result)

    if (response.ok && result.success) {
      console.log("Client: Pomyślnie wysłano przez API route")
      console.log("Client: Debug info:", result.debug)
      return { success: true, message: result.message, debug: result.debug }
    } else {
      console.error("Client: Błąd API route:", result)
      return { success: false, error: result.error || result.message, debug: result.debug }
    }
  } catch (error) {
    console.error("Client: Błąd podczas wysyłania przez API route:", error)
    return { success: false, error: "Błąd połączenia z serwerem" }
  }
}

// Pomocnicza funkcja do zapisywania zgłoszeń lokalnie (jako backup)
function saveSubmissionLocally(data: { name: string; email: string; phone: string }) {
  try {
    const storedSubmissions = localStorage.getItem("webinarSubmissions")
    const submissions = storedSubmissions ? JSON.parse(storedSubmissions) : []

    submissions.push({
      ...data,
      submittedAt: new Date().toISOString(),
      device: navigator.userAgent,
    })

    localStorage.setItem("webinarSubmissions", JSON.stringify(submissions))
    console.log("Client: Zgłoszenie zapisane lokalnie jako backup", data)
    return true
  } catch (error) {
    console.error("Client: Błąd podczas zapisywania zgłoszenia lokalnie", error)
    return false
  }
}

export function WebinarForm({ formStyle = "light", simplified = false }: WebinarFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [debugInfo, setDebugInfo] = useState<any>(null)

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
    setSubmitError("")

    console.log("Client: Rozpoczęcie wysyłania formularza")

    try {
      // Zapisz dane lokalnie jako backup
      saveSubmissionLocally(formData)

      // Wyślij dane przez API route do GetResponse
      const apiResult = await sendToWebinarAPI(formData)

      if (apiResult.success) {
        setSubmitMessage(apiResult.message || "Rejestracja zakończona pomyślnie!")
        setDebugInfo(apiResult.debug)
        setSubmitted(true)
        console.log("Client: Formularz wysłany pomyślnie")
      } else {
        setSubmitError(apiResult.error || "Wystąpił błąd podczas rejestracji")
        setDebugInfo(apiResult.debug)
        console.error("Client: Błąd podczas wysyłania formularza:", apiResult.error)
      }
    } catch (error) {
      console.error("Client: Nieoczekiwany błąd:", error)
      setSubmitError("Wystąpił nieoczekiwany błąd. Spróbuj ponownie.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setSubmitted(false)
    setSubmitError("")
    setSubmitMessage("")
    setDebugInfo(null)
    setFormData({ name: "", email: "", phone: "" })
  }

  return (
    <Card
      className={`relative ${formStyle === "dark" ? "bg-gradient-to-b from-navy-800/90 to-navy-900 border-gold/30" : "bg-white border-gold/10"} backdrop-blur-md shadow-gold`}
    >
      {!simplified && (
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="modern-badge inline-block mb-2 text-xs md:text-sm">
            <span className="designer-dot"></span>
            Najbliższy webinar: 27 lipca 2025, godz. 19:30
          </div>
          <CardTitle
            className={`text-lg md:text-xl luxury-heading ${formStyle === "dark" ? "text-white" : "text-navy"}`}
          >
            <span className="gradient-text-premium">Zapisz się teraz</span> – liczba miejsc ograniczona
          </CardTitle>
          <CardDescription className={`text-sm ${formStyle === "dark" ? "text-gray-300/80" : "text-gray-500"}`}>
            Jak skutecznie inwestować w nieruchomości w Dubaju?
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
            <p className={`${formStyle === "dark" ? "text-gray-300" : "text-gray-600"}`}>{submitMessage}</p>

            {/* Debug info - tylko w development */}
            {debugInfo && process.env.NODE_ENV === "development" && (
              <div className="mt-4 p-3 bg-gray-100 rounded text-left text-xs">
                <p>
                  <strong>Debug Info:</strong>
                </p>
                <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
              </div>
            )}

            <Button
              variant={formStyle === "dark" ? "modern" : "outline"}
              size="sm"
              onClick={resetForm}
              className={`mt-4 ${
                formStyle === "dark"
                  ? "bg-gradient-to-r from-gold-600 to-gold-800 text-white hover:from-gold-500 hover:to-gold-700 border-gold/30"
                  : "bg-navy text-white hover:bg-navy-light border-navy"
              }`}
            >
              Zarejestruj kolejną osobę
            </Button>
          </div>
        ) : (
          <form className="grid gap-3 md:gap-4" onSubmit={handleSubmit}>
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-800 font-medium">Błąd rejestracji</p>
                    <p className="text-red-600 text-sm">{submitError}</p>
                    {debugInfo && process.env.NODE_ENV === "development" && (
                      <details className="mt-2">
                        <summary className="text-xs text-red-500 cursor-pointer">Debug info</summary>
                        <pre className="text-xs mt-1 bg-red-100 p-2 rounded">{JSON.stringify(debugInfo, null, 2)}</pre>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-3 md:gap-4">
              <div>
                <Input
                  name="name"
                  placeholder="Imię i nazwisko"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`h-10 md:h-11 text-base transition-colors ${
                    formStyle === "dark"
                      ? "bg-navy-700/50 text-white border-gold/20 placeholder:text-gray-300/70 focus:border-gold/50"
                      : "bg-white text-gray-900 border-gold/10 placeholder:text-gray-500/70 focus:border-gold/50"
                  }`}
                  style={{
                    color: formStyle === "dark" ? "#ffffff" : "#111827",
                  }}
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
                  className={`h-10 md:h-11 text-base transition-colors ${
                    formStyle === "dark"
                      ? "bg-navy-700/50 text-white border-gold/20 placeholder:text-gray-300/70 focus:border-gold/50"
                      : "bg-white text-gray-900 border-gold/10 placeholder:text-gray-500/70 focus:border-gold/50"
                  }`}
                  style={{
                    color: formStyle === "dark" ? "#ffffff" : "#111827",
                  }}
                />
              </div>
              <div>
                <Input
                  name="phone"
                  placeholder="Telefon (np. 123456789)"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`h-10 md:h-11 text-base transition-colors ${
                    formStyle === "dark"
                      ? "bg-navy-700/50 text-white border-gold/20 placeholder:text-gray-300/70 focus:border-gold/50"
                      : "bg-white text-gray-900 border-gold/10 placeholder:text-gray-500/70 focus:border-gold/50"
                  }`}
                  style={{
                    color: formStyle === "dark" ? "#ffffff" : "#111827",
                  }}
                />
              </div>
            </div>

            {!simplified && <LimitedSpotsCounter totalSpots={50} takenSpots={42} className="mt-2" />}

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
