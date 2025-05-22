import { SectionTitle } from "@/components/ui/section-title"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqItems = [
    {
      question: "Ile czasu zajmuje założenie firmy w Dubaju?",
      answer:
        "Proces rejestracji firmy w Dubaju może zająć od 2 do 5 dni roboczych w przypadku stref wolnocłowych, a od 5 do 10 dni w przypadku firm na rynku lokalnym (mainland). Czas ten może się różnić w zależności od wybranej strefy, rodzaju działalności i kompletności dokumentacji.",
    },
    {
      question: "Czy muszę być fizycznie obecny w Dubaju, aby założyć firmę?",
      answer:
        "Nie, nie jest to konieczne. Większość procedur można przeprowadzić zdalnie. Nasz zespół może reprezentować Cię na podstawie pełnomocnictwa. Jednakże, w niektórych przypadkach, zwłaszcza przy otwieraniu konta bankowego, Twoja obecność może być wymagana, ale możemy to zorganizować w dogodnym dla Ciebie terminie.",
    },
    {
      question: "Jakie dokumenty są potrzebne do założenia firmy w Dubaju?",
      answer:
        "Podstawowe dokumenty to: paszport, CV, biznesplan (w niektórych przypadkach), formularz zgłoszeniowy oraz dokumenty potwierdzające doświadczenie zawodowe (w zależności od rodzaju działalności). Wszystkie dokumenty muszą być przetłumaczone na język angielski i czasami arabski. Nasz zespół pomoże Ci przygotować i skompletować całą niezbędną dokumentację.",
    },
    {
      question: "Czy naprawdę nie ma podatku dochodowego w Dubaju?",
      answer:
        "Tak, w Dubaju nie ma podatku dochodowego od osób fizycznych. W przypadku firm, w większości stref wolnocłowych (Free Zones) również nie ma podatku dochodowego. Od 2023 roku wprowadzono 9% podatek korporacyjny, ale dotyczy on tylko firm osiągających dochody powyżej 375,000 AED (około 100,000 USD) rocznie i nie obejmuje wszystkich typów działalności.",
    },
    {
      question: "Czy mogę mieć 100% udziałów w firmie jako obcokrajowiec?",
      answer:
        "Tak, w strefach wolnocłowych (Free Zones) możesz posiadać 100% udziałów w firmie jako obcokrajowiec. W przypadku firm na rynku lokalnym (mainland), od 2020 roku w większości sektorów gospodarki również możliwe jest posiadanie 100% udziałów przez obcokrajowców, choć niektóre strategiczne sektory nadal wymagają lokalnego partnera.",
    },
    {
      question: "Jakie są koszty założenia i prowadzenia firmy w Dubaju?",
      answer:
        "Koszty zależą od rodzaju firmy, lokalizacji i zakresu działalności. Obejmują one opłatę za licencję biznesową, rejestrację, wynajem biura (lub wirtualnego biura) oraz wizy. Roczne koszty utrzymania firmy w strefie wolnocłowej zaczynają się od około 15,000 AED (około 4,000 USD). Podczas konsultacji przedstawimy Ci dokładną kalkulację kosztów dopasowaną do Twojego biznesu.",
    },
    {
      question: "Czy mogę uzyskać wizę rezydencyjną po założeniu firmy?",
      answer:
        "Tak, jako właściciel firmy w Dubaju możesz ubiegać się o wizę rezydencyjną (investor visa) dla siebie i swojej rodziny. Wizy te są zazwyczaj wydawane na okres 2-3 lat z możliwością przedłużenia. Liczba wiz, o które możesz się ubiegać, zależy od rodzaju firmy, kapitału i lokalizacji.",
    },
    {
      question: "Jakie są najlepsze strefy wolnocłowe dla mojego biznesu?",
      answer:
        "Wybór strefy zależy od rodzaju działalności. Na przykład, DMCC jest idealna dla handlu, Dubai Internet City dla firm IT, Dubai Media City dla mediów i marketingu, a JAFZA dla logistyki i handlu. Podczas konsultacji pomożemy Ci wybrać najlepszą strefę dopasowaną do Twojego biznesu, biorąc pod uwagę koszty, lokalizację i specyficzne wymagania.",
    },
    {
      question: "Czy mogę prowadzić firmę w Dubaju zdalnie z Polski?",
      answer:
        "Tak, wiele firm w Dubaju jest zarządzanych zdalnie. Możesz korzystać z usług wirtualnego biura i zatrudnić lokalnego przedstawiciela do obsługi codziennych spraw administracyjnych. Jednakże, w zależności od rodzaju działalności, mogą istnieć pewne wymogi dotyczące fizycznej obecności lub lokalnego personelu.",
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
          description="Odpowiedzi na najczęściej zadawane pytania dotyczące zakładania i prowadzenia firmy w Dubaju"
        />

        <div className="max-w-3xl mx-auto fade-in">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-100 mb-3">
                <AccordionTrigger className="text-white hover:text-gold-300 font-light text-base sm:text-lg py-3 px-4 sm:px-5 bg-gradient-to-r from-navy-800/90 to-navy-900 border-gold/30 rounded-sm shadow-modern">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300/90 px-4 sm:px-5 py-3 bg-white rounded-b-sm shadow-modern">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Dodaj formularz do zadawania własnych pytań */}
        <div className="text-center mt-10 sm:mt-12 fade-in" style={{ animationDelay: "0.3s" }}>
          <p className="text-gray-600 mb-4">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/48123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Zapytaj przez WhatsApp</span>
            </a>
            <a
              href="https://m.me/dubaibusiness"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
              </svg>
              <span>Czatuj przez Messenger</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
