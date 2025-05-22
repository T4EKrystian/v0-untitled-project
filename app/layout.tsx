import type React from "react"
import type { Metadata } from "next"
import { Outfit, Space_Mono } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Dubai Business - Założ firmę w Dubaju bez podatków",
  description:
    "Kompleksowe wsparcie w zakładaniu i prowadzeniu firmy w Dubaju. 0% podatku dochodowego, 100% własności dla obcokrajowców, szybki proces rejestracji.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pl" className={`${outfit.variable} ${spaceMono.variable}`}>
      <body className="font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
