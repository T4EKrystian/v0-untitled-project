import { CheckCircle } from "lucide-react"
import { SectionTitle } from "@/components/ui/section-title"

export function ForWhomSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden">
      {/* Geometric shapes */}
      <div className="geometric-shape geometric-triangle w-64 h-64 bottom-20 right-20 rotate-180"></div>
      <div className="absolute inset-0 dot-pattern"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Dla kogo"
          title="Webinar dla poważnych inwestorów"
          description="Sprawdź, czy pasuje do Twoich celów i możliwości finansowych"
        />

        <div className="max-w-3xl mx-auto fade-in">
          <div className="bg-gradient-to-br from-navy-800/90 to-navy-900 border-gold/30 rounded-xl p-4 sm:p-6 md:p-8 text-white shadow-gold">
            <h3 className="text-xl sm:text-2xl font-light text-gold-300 mb-4 sm:mb-5">
              Webinar jest idealny dla osób, które:
            </h3>
            <ul className="space-y-4">
              {[
                "Mają kapitał od 600 000 zł i chcą go zainwestować z lepszym zwrotem niż w Polsce",
                "Rozważają przeprowadzkę lub zakup mieszkania wakacyjnego w Dubaju",
                "Chcą ochronić pieniądze przed inflacją i zoptymalizować podatki",
                "Szukają konkretnej strategii inwestycyjnej, a nie ogólnych porad",
                "Planują długoterminową współpracę z doświadczonym opiekunem inwestorów",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" strokeWidth={1} />
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 p-4 bg-gold/10 rounded-lg border border-gold/20">
              <h4 className="text-lg font-medium text-gold-300 mb-2">Wsparcie na miejscu w Dubaju</h4>
              <p className="text-gray-300">
                Po webinarze, jeśli zdecydujesz się na inwestycję, zapewniamy pełne wsparcie na miejscu - osobiste
                oprowadzanie po nieruchomościach, spotkania w naszym biurze w Dubaju i ciągłą opiekę przez cały proces
                inwestycyjny.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
