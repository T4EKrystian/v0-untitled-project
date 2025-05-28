"use client"

import { SectionTitle } from "@/components/ui/section-title"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, MapPin, Users, Shield } from "lucide-react"

export function WebinarValueSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 section-light modern-section relative overflow-hidden">
      {/* Geometric shapes */}
      <div className="geometric-shape geometric-circle w-80 h-80 top-20 -left-40"></div>
      <div className="absolute inset-0 subtle-grid opacity-30"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="Dlaczego warto"
          title={
            <span>
              Webinar dla <span className="gradient-text-premium">poważnych inwestorów</span> od 600 000 zł
            </span>
          }
          description="Inwestycje w Dubaju wymagają odpowiedniego kapitału i podejścia. Sprawdź, czy to dla Ciebie."
        />

        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 mt-8 sm:mt-10">
          <Card className="bg-white elegant-card">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4 sm:mb-6">Webinar jest dla osób, które:</h3>
              <div className="space-y-4">
                {[
                  "Mają kapitał od 600 000 zł do zainwestowania",
                  "Szukają stabilnych zwrotów 8-10% rocznie",
                  "Chcą zdywersyfikować portfel inwestycyjny",
                  "Planują realną decyzję w najbliższych miesiącach",
                  "Cenią profesjonalne doradztwo i wsparcie",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" strokeWidth={1} />
                    <span className="text-navy-600 text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-navy-800 to-navy-900 border-gold/30 elegant-card">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Kompleksowa opieka inwestora</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-6 w-6 text-gold-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gold-100 font-semibold mb-1">Wsparcie na miejscu w Dubaju</p>
                    <p className="text-gray-300">
                      Jeśli planujesz wyjazd do Dubaju, umówimy się na miejscu. Oprowadzę Cię osobiście po
                      nieruchomościach i pomogę w podjęciu najlepszej decyzji.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-6 w-6 text-gold-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gold-100 font-semibold mb-1">Długoterminowa współpraca</p>
                    <p className="text-gray-300">
                      Nie kończymy na sprzedaży - pomagamy w zarządzaniu inwestycją, wynajmie i maksymalizacji zwrotów.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-6 w-6 text-gold-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gold-100 font-semibold mb-1">Bezpieczeństwo transakcji</p>
                    <p className="text-gray-300">
                      13 lat doświadczenia i ponad 400 zrealizowanych transakcji to gwarancja profesjonalnego podejścia.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 sm:mt-10 bg-gold-50 p-6 sm:p-8 rounded-xl border border-gold/20">
          <h3 className="text-xl sm:text-2xl font-bold text-navy mb-4 text-center">
            Minimalna kwota inwestycji: 600 000 zł
          </h3>
          <p className="text-navy-600 text-center text-lg max-w-3xl mx-auto">
            Inwestycje w premium nieruchomości w Dubaju wymagają odpowiedniego kapitału. Ta kwota pozwala na zakup
            mieszkania w dobrych lokalizacjach z potencjałem wzrostu wartości i stabilnymi zwrotami z wynajmu.
          </p>
        </div>
      </div>
    </section>
  )
}
