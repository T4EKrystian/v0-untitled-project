import { WebinarForm } from "../webinar-form"
import { CountdownTimer } from "../countdown-timer"
import { Calendar, Clock, Users, Star } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Ostatnie miejsca dostępne!
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Nie czekaj – <span className="gradient-text-premium">miejsca się kończą!</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8">
            Webinar: <strong>Jak skutecznie inwestować w nieruchomości w Dubaju?</strong>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold-400" />
              <span>27 lipca 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-400" />
              <span>19:30 (czas polski)</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gold-400" />
              <span>Bezpłatny udział</span>
            </div>
          </div>

          <CountdownTimer targetDate="2025-07-27T19:30:00" className="mb-12" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">Co otrzymasz podczas webinaru:</h3>

            <div className="space-y-4">
              {[
                "Kompletny przewodnik po inwestowaniu w Dubaju",
                "Analiza najlepszych lokalizacji i projektów",
                "Strategie finansowania i optymalizacji podatkowej",
                "Prawne aspekty zakupu nieruchomości",
                "Sesja Q&A z ekspertem",
                "Ekskluzywne materiały do pobrania",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="bg-gold-500/10 border border-gold-500/20 rounded-lg p-6 mt-8">
              <h4 className="text-gold-400 font-bold mb-2">🎁 Bonus dla uczestników:</h4>
              <p className="text-gray-300">
                Wszyscy uczestnicy otrzymają bezpłatną konsultację 1-na-1 oraz dostęp do ekskluzywnej bazy ofert
                inwestycyjnych.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-8">
            <WebinarForm formStyle="dark" />
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            * Webinar jest całkowicie bezpłatny. Liczba miejsc ograniczona do 50 osób.
          </p>
        </div>
      </div>
    </section>
  )
}
