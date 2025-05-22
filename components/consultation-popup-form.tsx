"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { ConsultationForm } from "./consultation-form"

interface ConsultationPopupFormProps {
  isOpen: boolean
  onClose: () => void
}

export function ConsultationPopupForm({ isOpen, onClose }: ConsultationPopupFormProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md mx-auto fade-in">
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm z-20"
        >
          <X className="h-5 w-5 text-gray-600" strokeWidth={1} />
        </button>
        <ConsultationForm />
      </div>
    </div>
  )
}
