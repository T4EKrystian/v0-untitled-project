import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ConsultationFormProps {
  formStyle?: "light" | "dark"
  simplified?: boolean
}

export function ConsultationForm({ formStyle = "light", simplified = false }: ConsultationFormProps) {
  return (
    <Card
      className={`relative ${formStyle === "dark" ? "bg-gradient-to-b from-navy-800 to-navy-900 border-gold/30" : "bg-white border-gold/10"} shadow-gold`}
    >
      {!simplified && (
        <CardHeader className="pb-2 px-4 md:px-6">
          <div className="modern-badge inline-block mb-2 text-xs md:text-sm">
            <span className="designer-dot"></span>
            Bezpłatna konsultacja
          </div>
          <CardTitle
            className={`text-lg md:text-xl luxury-heading ${formStyle === "dark" ? "text-white" : "text-navy"}`}
          >
            <span className="gradient-text-premium">Skontaktuj się z nami</span> – odpowiemy w 24h
          </CardTitle>
          <CardDescription className={`text-sm ${formStyle === "dark" ? "text-gray-300/80" : "text-gray-500"}`}>
            Dowiedz się, jak możemy pomóc Ci założyć i rozwinąć Twój biznes w Dubaju
          </CardDescription>
        </CardHeader>
      )}
      <CardContent className={`${simplified ? "p-0" : "p-4 md:p-6"}`}>
        <form className="grid gap-3 md:gap-4">
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            <div>
              <Input
                placeholder="Imię i nazwisko"
                className={`premium-input h-10 md:h-11 text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
              />
            </div>
            <div>
              <Input
                placeholder="Email"
                type="email"
                className={`premium-input h-10 md:h-11 text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
              />
            </div>
            <div>
              <Input
                placeholder="Telefon"
                type="tel"
                className={`premium-input h-10 md:h-11 text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
              />
            </div>
            {!simplified && (
              <>
                <div>
                  <Select>
                    <SelectTrigger
                      className={`premium-input h-10 md:h-11 text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
                    >
                      <SelectValue placeholder="Rodzaj działalności" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freezone">Strefa wolnocłowa (Free Zone)</SelectItem>
                      <SelectItem value="mainland">Rynek lokalny (Mainland)</SelectItem>
                      <SelectItem value="offshore">Firma offshore</SelectItem>
                      <SelectItem value="unsure">Nie jestem pewien/pewna</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea
                    placeholder="Twoje pytanie lub komentarz"
                    className={`premium-input min-h-[100px] text-base ${formStyle === "dark" ? "bg-navy-700/50 text-white border-gold/20 placeholder-gray-400" : "bg-white text-navy border-gold/10 placeholder-gray-500"} hover:border-gold/40 focus:border-gold/50 transition-colors`}
                  />
                </div>
              </>
            )}
          </div>

          <Button
            variant="modern"
            size={simplified ? "lg" : "xl"}
            className={`w-full mt-2 group bg-gradient-to-br from-gold-600 to-gold-800 text-white border-gold/30 hover:from-gold-500 hover:to-gold-700 text-base py-5 ${simplified ? "" : ""}`}
          >
            <span>{simplified ? "Wyślij zapytanie" : "Umów bezpłatną konsultację"}</span>
          </Button>

          {!simplified && (
            <p className="text-xs text-center text-navy-light/60 mt-1">
              Wysyłając formularz, zgadzasz się na naszą{" "}
              <Link
                href="#"
                className="text-gold underline underline-offset-2 hover:text-gold-dark transition-colors elegant-link"
              >
                politykę prywatności
              </Link>
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}
