"use client"

import type React from "react"

import { useState } from "react"
import { SectionTitle } from "@/components/ui/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Calculator } from "lucide-react"

interface TaxCalculatorSectionProps {
  onCtaClick?: (e: React.MouseEvent) => void
}

export function TaxCalculatorSection({ onCtaClick }: TaxCalculatorSectionProps) {
  const [income, setIncome] = useState<number>(0)
  const [country, setCountry] = useState<string>("poland")
  const [showResults, setShowResults] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [showEmailForm, setShowEmailForm] = useState<boolean>(false)

  const calculateTax = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowResults(true)
    }, 1000)
  }

  const getLocalTax = () => {
    switch (country) {
      case "poland":
        return income * 0.19 // 19% tax rate simplified
      case "germany":
        return income * 0.3 // 30% tax rate simplified
      case "uk":
        return income * 0.2 // 20% tax rate simplified
      default:
        return income * 0.19
    }
  }

  const getDubaiTax = () => {
    // Dubai has 0% personal income tax and 0% corporate tax for most businesses
    return 0
  }

  const getSavings = () => {
    return getLocalTax() - getDubaiTax()
  }

  const getCountryName = () => {
    switch (country) {
      case "poland":
        return "Polsce"
      case "germany":
        return "Niemczech"
      case "uk":
        return "Wielkiej Brytanii"
      default:
        return "Polsce"
    }
  }

  const handleGetFullReport = () => {
    setShowEmailForm(true)
  }

  const handleSubmitEmail = () => {
    // Here you would normally send the email to your CRM
    // For now, we'll just simulate success
    onCtaClick && onCtaClick(null)
  }

  return (
    <section id="calculator" className="py-8 sm:py-12 md:py-16 section-dark modern-section relative overflow-hidden">
      {/* Designer decorative elements */}
      <div className="designer-circle w-96 h-96 opacity-10 top-[10%] right-[10%]"></div>
      <div className="designer-circle w-80 h-80 opacity-10 bottom-[20%] left-[5%]"></div>
      <div className="designer-square w-60 h-60 opacity-10 top-[40%] left-[10%] rotate-12"></div>

      {/* Abstract blurred elements */}
      <div className="blurred-dots top-40 right-[15%]"></div>
      <div className="blurred-dots bottom-40 left-[20%]"></div>

      {/* Geometric shapes */}
      <div className="geometric-shape geometric-square w-72 h-72 -top-36 -right-36 rotate-12"></div>
      <div className="geometric-shape geometric-circle w-96 h-96 -bottom-48 -left-48"></div>
      <div className="absolute inset-0 subtle-grid opacity-30"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Kalkulator oszczędności"
          title={
            <span>
              Sprawdź, ile <span className="gradient-text">zaoszczędzisz</span> przenosząc firmę do Dubaju
            </span>
          }
          description="Oblicz swoje potencjalne oszczędności podatkowe w zaledwie kilka sekund"
        />

        <div className="max-w-3xl mx-auto">
          <Card className="border-gold/20 shadow-gold">
            <CardContent className="p-6">
              {!showResults ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                      Roczny dochód firmy (EUR)
                    </label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="np. 100000"
                      className="premium-input"
                      value={income || ""}
                      onChange={(e) => setIncome(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Obecny kraj prowadzenia działalności
                    </label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="premium-input">
                        <SelectValue placeholder="Wybierz kraj" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="poland">Polska</SelectItem>
                        <SelectItem value="germany">Niemcy</SelectItem>
                        <SelectItem value="uk">Wielka Brytania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="modern" className="w-full mt-2" onClick={calculateTax} disabled={!income || loading}>
                    {loading ? (
                      "Obliczanie..."
                    ) : (
                      <>
                        <Calculator className="mr-2 h-5 w-5" />
                        Oblicz oszczędności
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-navy mb-2">Twoje potencjalne oszczędności</h3>
                    <p className="text-gray-500">
                      Porównanie podatków w {getCountryName()} i Dubaju dla dochodu {income.toLocaleString()} EUR
                      rocznie
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500 mb-1">Podatek w {getCountryName()}</p>
                      <p className="text-2xl font-bold text-red-500">
                        {getLocalTax().toLocaleString()} EUR <span className="text-sm font-normal">/ rok</span>
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-md">
                      <p className="text-sm text-gray-500 mb-1">Podatek w Dubaju</p>
                      <p className="text-2xl font-bold text-green-500">
                        {getDubaiTax().toLocaleString()} EUR <span className="text-sm font-normal">/ rok</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gold-50 p-4 rounded-md border border-gold/20">
                    <p className="text-sm text-gray-700 mb-1">Twoje roczne oszczędności</p>
                    <p className="text-3xl font-bold text-gold-600">{getSavings().toLocaleString()} EUR</p>
                    <p className="text-sm text-gray-500 mt-1">
                      To {Math.round((getSavings() / income) * 100)}% Twojego rocznego dochodu!
                    </p>
                  </div>

                  {!showEmailForm ? (
                    <div className="space-y-4">
                      <Button variant="modern" className="w-full" onClick={handleGetFullReport}>
                        Otrzymaj pełny raport oszczędności
                      </Button>
                      <Button variant="outline" className="w-full" onClick={() => setShowResults(false)}>
                        Oblicz ponownie
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        Podaj swój adres email, aby otrzymać szczegółowy raport oszczędności podatkowych
                      </p>
                      <Input
                        type="email"
                        placeholder="Twój adres email"
                        className="premium-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Button
                        variant="modern"
                        className="w-full"
                        onClick={handleSubmitEmail}
                        disabled={!email.includes("@")}
                      >
                        <span>Otrzymaj raport i umów konsultację</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
