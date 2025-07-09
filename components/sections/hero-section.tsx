const HeroSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Dołącz do naszego wyjątkowego webinaru!</h1>
        <p className="text-lg mb-8">Odkryj sekrety efektywnego zarządzania czasem i zwiększ swoją produktywność.</p>
        <div className="mb-8">
          <p className="font-semibold">Data: 27 lipca 2025</p>
          <p className="font-semibold">Godzina: 19:30</p>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Zarejestruj się teraz!
        </button>
      </div>
    </section>
  )
}

export { HeroSection }
export default HeroSection
