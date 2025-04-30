import { X } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionTitle } from "@/components/ui/section-title"

export function NotForEveryoneSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 section-dark modern-section relative overflow-hidden">
      {/* Geometric shapes */}
      <div className="geometric-shape geometric-square w-64 h-64 top-20 -left-32 rotate-45"></div>
      <div className="absolute inset-0 minimal-grid opacity-30"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Ważne"
          title="Nie każdy powinien się zapisać. I dobrze."
          description="Szanujemy czas – swój i Twój. Ten webinar nie jest dla wszystkich. Jeśli nie traktujesz inwestycji poważnie, po prostu nie klikaj dalej."
        />

        <div className="max-w-3xl mx-auto fade-in">
          <Card modern className="bg-white">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-light">Nie zapisuj się, jeśli:</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  "Szukasz szybkiego wzbogacenia się bez zaangażowania",
                  "Nie masz jeszcze żadnych środków do inwestycji",
                  "Nie chcesz zarabiać pasywnie, tylko aktywnie pracować na wynik",
                  "Szukasz tylko informacji i nie planujesz realnej decyzji w najbliższych miesiącach",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" strokeWidth={1} />
                    <span className="text-gray-500 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <p className="text-center text-gray-700 mt-4 sm:mt-6 text-base sm:text-lg font-light">
            Zapisują się ludzie, którzy nie pytają „czy", tylko „jak".
          </p>
        </div>
      </div>
    </section>
  )
}
