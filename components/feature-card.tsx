import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  modern?: boolean
}

export function FeatureCard({ icon, title, description, modern = true }: FeatureCardProps) {
  return (
    <Card modern={modern} className="group h-full hover-lift elegant-card">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="transition-transform duration-300 group-hover:scale-110 text-gold-500 bg-white/80 p-2 inline-block rounded-md shrink-0">
          {icon}
        </div>
        <CardTitle className="text-lg luxury-heading group-hover:text-gold-500 transition-colors duration-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-500 group-hover:text-gray-700 transition-colors duration-300 luxury-text">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
