import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  isHighlighted?: boolean
  metrics?: {
    roi: string
    timeToRent: string
    location: string
  }
}

export function TestimonialCard({ name, role, content, isHighlighted, metrics }: TestimonialCardProps) {
  return (
    <Card className={`bg-white elegant-card ${isHighlighted ? "border-gold-100" : ""}`}>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 rounded-md bg-gold-50 flex items-center justify-center shadow-sm relative subtle-corner">
            <span className="text-gold-500 font-light text-base">{name.charAt(0)}</span>
          </div>
          <div>
            <CardTitle className="text-base luxury-heading">{name}</CardTitle>
            <CardDescription className="text-gray-500">{role}</CardDescription>
          </div>
        </div>
        {isHighlighted && metrics && (
          <div className="mt-4 bg-gold-50 border-0 rounded-md p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-gold-100 opacity-20 -rotate-45 translate-x-6 -translate-y-6"></div>
            <p className="text-xs font-light text-gold-600 mb-2 uppercase tracking-widest">Case Study</p>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <span className="block text-gray-400 mb-1 text-xs">ROI</span>
                <span className="font-light luxury-number">{metrics.roi}</span>
              </div>
              <div>
                <span className="block text-gray-400 mb-1 text-xs">Czas do najmu</span>
                <span className="font-light">{metrics.timeToRent}</span>
              </div>
              <div>
                <span className="block text-gray-400 mb-1 text-xs">Lokalizacja</span>
                <span className="font-light">{metrics.location}</span>
              </div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 relative luxury-text">
          <span className="absolute -top-3 -left-1 text-3xl text-gold-200 opacity-50">"</span>
          <span className="relative z-10">{content}</span>
          <span className="absolute -bottom-6 -right-1 text-3xl text-gold-200 opacity-50">"</span>
        </p>
      </CardContent>
    </Card>
  )
}
