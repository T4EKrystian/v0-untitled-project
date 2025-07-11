"use client"
import { X, Calendar, Clock, Users } from "lucide-react"
import { WebinarForm } from "./webinar-form"

interface WebinarPopupFormProps {
  isOpen: boolean
  onClose: () => void
}

export function WebinarPopupForm({ isOpen, onClose }: WebinarPopupFormProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Ostatnie miejsca!
            </div>

            <h2 className="text-2xl font-bold text-navy mb-2">Nie przegap tej okazji!</h2>

            <p className="text-gray-600 mb-4">
              Webinar: <strong>Jak skutecznie inwestować w nieruchomości w Dubaju?</strong>
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                27 lipca 2025
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                19:30
              </div>
            </div>
          </div>

          <WebinarForm formStyle="light" simplified={true} />
        </div>
      </div>
    </div>
  )
}
