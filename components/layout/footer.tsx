import Link from "next/link"
import { Building2, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white py-8 sm:py-12 border-t border-navy/5">
      <div className="container">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-5 w-5 text-gold" strokeWidth={1.5} />
              <span className="text-lg font-semibold">Dubai Dream Home</span>
            </div>
            <p className="text-gray-300/80">
              Dubai Dream Home – pomagamy inwestorom z Polski wejść na rynek nieruchomości w Dubaju w bezpieczny i
              zoptymalizowany sposób.
            </p>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-3 sm:mb-4">Social Media</h3>
            <div className="space-y-2 sm:space-y-3">
              <Link
                href="https://www.facebook.com/share/16mbzzdT71/"
                target="_blank"
                className="flex items-center gap-3 text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span>Facebook</span>
              </Link>
              <Link
                href="https://www.instagram.com/dubai_dreamhome?igsh=MW9lOXNiN3FwNDlmdw=="
                target="_blank"
                className="flex items-center gap-3 text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span>Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/peter-obarzanek?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                target="_blank"
                className="flex items-center gap-3 text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-3 sm:mb-4">Kontakt</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <Link
                  href="mailto:wojciech@dubaidreamhome.ae"
                  className="text-gray-300/80 hover:text-gold-300 transition-colors duration-200"
                >
                  wojciech@dubaidreamhome.ae
                </Link>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                <span className="text-gray-300/80">Al. Jana Pawła II 29, Warszawa</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-px bg-navy/5 my-6 sm:my-8"></div>
        <div className="text-center text-navy/40">
          <p>© {new Date().getFullYear()} Dubai Dream Home. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  )
}
