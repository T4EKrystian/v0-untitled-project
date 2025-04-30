import type React from "react"

const HeroSection: React.FC = () => {
  const headline = (() => {
    const variant = Math.floor(Math.random() * 4)
    switch (variant) {
      case 0:
        return "Zainwestuj w Dubaju i zacznij zarabiać jak inwestor z Zatoki – bez podatków, z pełną własnością i wysokim ROI"
      case 1:
        return "Zarabiaj w AED i USD – z wynajmu krótkoterminowego i wzrostu wartości, bez podatków i zbędnych formalności"
      case 2:
        return "Zarabiaj w AED i USD albo mieszkaj w jednym z najnowocześniejszych miast świata – z pełną własnością, bez podatków i biurokracji"
      case 3:
        return "Kup lub zainwestuj w Dubaju – bez podatków, z pełną własnością i wzrostem wartości szybszym niż w Europie"
      default:
        return "Zainwestuj w Dubaju i zacznij zarabiać jak inwestor z Zatoki – bez podatków, z pełną własnością i wysokim ROI"
    }
  })()

  return (
    <section>
      <h1>{headline}</h1>
      <p>Some supporting text for the hero section.</p>
    </section>
  )
}

export default HeroSection
