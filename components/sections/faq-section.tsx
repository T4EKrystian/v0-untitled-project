import { SectionTitle } from "@/components/ui/section-title"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqItems = [
    {
      question: "Czy muszę lecieć do Dubaju, żeby kupić nieruchomość?",
      answer:
        "Absolutnie nie! Cały proces można przeprowadzić zdalnie. Zapewniamy wirtualne spacery po nieruchomościach, wideokonferencje z deweloperami i pełną obsługę prawną online. Wielu naszych klientów nigdy nie było w Dubaju przed zakupem.",
    },
    {
      question: "Czy mogę inwestować bez doświadczenia w nieruchomościach?",
      answer:
        "Oczywiście! Większość naszych klientów to osoby bez wcześniejszego doświadczenia w inwestowaniu w nieruchomości. Nasz zespół przeprowadzi Cię przez cały proces krok po kroku, wyjaśniając wszystkie aspekty inwestycji w przystępny sposób.",
    },
    {
      question: "Czy to bezpieczne inwestować w kraju arabskim?",
      answer:
        "Dubaj jest jednym z najbezpieczniejszych miejsc do inwestowania na świecie. Prawo własności dla cudzoziemców jest w pełni chronione, a system prawny jest przejrzysty i przyjazny dla inwestorów. Wskaźnik przestępczości w Dubaju jest jednym z najniższych na świecie.",
    },
    {
      question: "Co jeśli nie znam języka arabskiego ani lokalnych zwyczajów?",
      answer:
        "Nie martw się! Angielski jest powszechnie używany w biznesie i codziennym życiu w Dubaju. Wszystkie dokumenty są dostępne w języku angielskim, a nasz zespół pomoże Ci zrozumieć lokalne zwyczaje i etykietę biznesową.",
    },
    {
      question: "Czy webinar jest płatny?",
      answer:
        "Nie, webinar jest całkowicie bezpłatny. Naszym celem jest edukacja i pokazanie możliwości inwestycyjnych w Dubaju bez żadnych zobowiązań z Twojej strony.",
    },
    {
      question: "Czy nie stracę pieniędzy inwestując tak daleko od domu?",
      answer:
        "To naturalna obawa, ale nasi klienci często osiągają lepsze wyniki niż przy inwestycjach lokalnych. Zapewniamy pełne zarządzanie nieruchomością, regularne raporty i całodobowy kontakt. Twoja inwestycja jest bezpieczna nawet gdy jesteś tysiące kilometrów dalej.",
    },
    {
      question: "Jaki budżet jest potrzebny na start?",
      answer:
        "Inwestycje w Dubaju są dostępne w różnych przedziałach cenowych. Podczas webinaru przedstawimy opcje inwestycyjne zaczynające się od 150,000 USD, a także możliwości finansowania zakupu.",
    },
    {
      question: "Czy mogę uzyskać wizę rezydencką kupując nieruchomość?",
      answer:
        "Tak, zakup nieruchomości o wartości co najmniej 750,000 AED uprawnia do ubiegania się o wizę rezydencką na 2 lata. Przy zakupie nieruchomości o wartości 2 milionów AED lub więcej, można ubiegać się o wizę na 10 lat.",
    },
    {
      question: "Co jeśli nie mogę uczestniczyć w webinarze na żywo?",
      answer:
        "Dla osób, które zarejestrują się, ale nie będą mogły uczestniczyć w webinarze na żywo, wyślemy nagranie. Będziesz mógł obejrzeć je w dogodnym dla siebie czasie.",
    },
  ]

  return (
    <section id="faq" className="py-8 sm:py-12 md:py-16 section-dark modern-section relative overflow-hidden">
      {/* Geometric shapes */}
      <div className="geometric-shape geometric-square w-64 h-64 bottom-20 -right-32 rotate-12"></div>
      <div className="absolute inset-0 minimal-grid opacity-30"></div>

      <div className="container relative z-10">
        <SectionTitle
          badge="FAQ"
          title="Masz pytania? Mamy odpowiedzi"
          description="Odpowiedzi na pytania, które mogą Cię nurtować"
        />

        <div className="max-w-3xl mx-auto fade-in">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-100 mb-3 w-full">
                <AccordionTrigger className="text-white hover:text-gold-300 font-light text-base sm:text-lg py-3 px-4 sm:px-5 bg-gradient-to-r from-navy-800/90 to-navy-900 border-gold/30 rounded-sm shadow-modern w-full text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300/90 px-4 sm:px-5 py-3 bg-white rounded-b-sm shadow-modern">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
