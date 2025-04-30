import Link from "next/link"
import { Building2, Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-8 sm:py-12 border-t border-navy/5">
      <div className="container">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <span className="text-lg font-semibold">Dubai Invest</span>
            </div>
            <p className="text-gray-300/80">
              Dubai Invest – pomagamy inwestorom z Polski wejść na rynek nieruchomości w Dubaju w bezpieczny i
              zoptymalizowany sposób.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-3 sm:mb-4">Social Media</h3>
            <div className="space-y-2 sm:space-y-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="flex items-center gap-3 text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span>Facebook</span>
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="flex items-center gap-3 text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span>Instagram</span>
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="flex items-center gap-3 text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span>LinkedIn</span>
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                className="flex items-center gap-3 text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span>Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-3 sm:mb-4">Kontakt</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <Link
                  href="mailto:kontakt@dubaiinvest.pl"
                  className="text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
                >
                  kontakt@dubaiinvest.pl
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <Link
                  href="tel:+48123456789"
                  className="text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
                >
                  +48 123 456 789
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span className="text-gray-300/80">ul. Marszałkowska 142, Warszawa</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-3 sm:mb-4">Newsletter</h3>
            <p className="text-gray-300/80 mb-3">
              Zapisz się, aby otrzymywać najnowsze informacje o rynku nieruchomości w Dubaju.
            </p>
            <form className="space-y-2 sm:space-y-3">
              <Input
                placeholder="Twój email"
                className="premium-input h-10 border-gold/10 focus:border-gold/30 bg-navy-800 text-white"
              />
              <Button variant="modern" className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900">
                Zapisz się
              </Button>
            </form>
          </div>
        </div>
        <div className="h-px bg-navy/5 my-6 sm:my-8"></div>
        <div className="text-center text-navy/40">
          <p>© {new Date().getFullYear()} Dubai Invest. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}
