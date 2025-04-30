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
          title="Ten webinar jest dla Ciebie, jeśli..."
          description="Sprawdź, czy pasuje do Twoich celów i potrzeb"
        />

        <div className="max-w-3xl mx-auto fade-in">
          <div className="bg-gradient-to-br from-navy-800/90 to-navy-900 border-gold/30 rounded-xl p-4 sm:p-6 md:p-8 text-white shadow-gold">
            <h3 className="text-xl sm:text-2xl font-light text-gold-300 mb-4 sm:mb-5">
              Webinar jest idealny dla osób, które:
            </h3>
            <ul className="space-y-4">
              {[
                "Masz kapitał i chcesz go zainwestować z lepszym zwrotem niż w Polsce",
                "Rozważasz przeprowadzkę lub zakup mieszkania wakacyjnego",
                "Chcesz ochronić pieniądze przed inflacją i podatkami",
                "Nie chcesz tracić czasu na research – szukasz konkretnej strategii",
                "Planujesz przeprowadzkę do Dubaju i chcesz kupić nieruchomość bez stresu",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <CheckCircle className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" strokeWidth={1} />
                  <span className="text-gray-300 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
