export function MiniTestimonial() {
  return (
    <div className="bg-white/80 backdrop-blur-sm border border-gold/20 rounded-md p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-gold-50 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-gold-500 font-light text-sm">M</span>
        </div>
        <div>
          <p className="text-sm text-navy-600 italic">
            "Zainwestowałem w apartament w Dubai Marina. ROI na poziomie 9,2% rocznie. Proces był prosty i przejrzysty."
          </p>
          <p className="text-xs text-navy-400 mt-1">Marek K., inwestor z Polski</p>
        </div>
      </div>
    </div>
  )
}
