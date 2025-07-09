"use client"

import { Button } from "@/components/ui/button"
import { WebinarForm } from "@/components/webinar-form"
import { CountdownTimer } from "@/components/countdown-timer"
import { ArrowRight, Calendar, Clock, Users } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="geometric-circle w-96 h-96 -top-48 -right-48"></div>
        <div className="geometric-square w-32 h-32 top-1/4 left-10 rotate-45"></div>
        <div className="geometric-triangle w-24 h-24 bottom-1/4 right-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="modern-badge inline-block mb-6">
              <span className="designer-dot"></span>
              Ostatnia szansa na rejestrację
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 luxury-heading">
              Nie przegap tej <span className="gradient-text-premium">wyjątkowej okazji</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Dołącz do ekskluzywnego grona inwestorów, którzy już dziś budują swoją przyszłość finansową w Dubaju
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white text-center mb-8">Do rozpoczęcia webinaru pozostało:</h3>
            <CountdownTimer targetDate="2025-07-27T19:30:00" />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Benefits */}
            <div className="space-y-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Co zyskasz uczestnicząc w webinarze?</h3>
                <div className="space-y-4">
                  {[
                    "Ekskluzywne strategie inwestycyjne w nieruchomości Dubai",
                    "Praktyczne wskazówki od ekspertów z wieloletnim doświadczeniem",
                    "Dostęp do najlepszych ofert inwestycyjnych",
                    "Bezpłatną konsultację z naszym zespołem ekspertów",
                    "Materiały edukacyjne i przewodniki do pobrania",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ArrowRight className="w-3 h-3 text-gold-400" />
                      </div>
                      <p className="text-gray-300">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webinar Details */}
              <div className="bg-gold/10 backdrop-blur-sm rounded-xl p-8 border border-gold/20">
                <h4 className="text-xl font-semibold text-white mb-6">Szczegóły webinaru</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gold-400" />
                    <span className="text-gray-300">27 lipca 2025</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gold-400" />
                    <span className="text-gray-300">19:30 (czas polski)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gold-400" />
                    <span className="text-gray-300">Ograniczona liczba miejsc</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Registration Form */}
            <div className="lg:sticky lg:top-8">
              <WebinarForm formStyle="dark" />
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-gray-400 mb-6">Webinar jest całkowicie bezpłatny. Miejsca są ograniczone.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="outline"
                size="lg"
                className="border-gold/30 text-gold-400 hover:bg-gold/10 bg-transparent"
              >
                Dowiedz się więcej
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-gold-600 to-gold-800 text-white hover:from-gold-500 hover:to-gold-700"
              >
                Zapisz się teraz
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
