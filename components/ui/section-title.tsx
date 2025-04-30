import type React from "react"

interface SectionTitleProps {
  badge?: string
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
  centered?: boolean
  modern?: boolean
}

export function SectionTitle({
  badge,
  title,
  description,
  className = "",
  centered = true,
  modern = true,
}: SectionTitleProps) {
  return (
    <div
      className={`${centered ? "text-center" : ""} mb-8 sm:mb-10 max-w-3xl ${
        centered ? "mx-auto" : ""
      } ${className} animate-fade-in-up`}
    >
      {badge && (
        <div className={`modern-badge inline-block mb-3 sm:mb-4 text-gold`}>
          <span className="designer-dot"></span>
          {badge}
          <span className="designer-dot"></span>
        </div>
      )}
      <div className="relative px-4 py-2 sm:py-3">
        {modern && centered && <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-10 h-px bg-gold/20"></div>}
        <h2 className={`text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-navy ${modern ? "leading-tight" : ""}`}>
          {title}
        </h2>
        {modern && centered && (
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-10 h-px bg-gold/20"></div>
        )}
      </div>
      {description && (
        <p className="text-navy-light/80 text-base sm:text-lg max-w-2xl mx-auto mt-3 pt-2">{description}</p>
      )}
    </div>
  )
}
