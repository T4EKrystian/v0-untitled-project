"use server"

export async function submitForm(formData: FormData) {
  try {
    console.log("Server Action: rozpoczęcie przetwarzania formularza")

    // Pobierz dane z formularza
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string

    console.log("Server Action: otrzymane dane:", { name, email, phone })

    // Walidacja danych
    if (!name || !email || !phone) {
      console.error("Server Action: brakujące dane w formularzu")
      return {
        success: false,
        message: "Wszystkie pola są wymagane",
      }
    }

    // Przygotowanie danych do wysłania
    const data = {
      name,
      email,
      phone,
      timestamp: new Date().toISOString(),
    }

    // Próba pobrania URL z zmiennej środowiskowej
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL || ""
    console.log("Server Action: URL ze zmiennej środowiskowej:", scriptUrl ? "dostępny" : "niedostępny")

    // Nie wykonujemy fetch, jeśli URL jest pusty
    if (!scriptUrl) {
      console.log("Server Action: brak URL - pomijamy wysyłanie danych")

      // Zwracamy sukces, ale z informacją o braku wysłania
      return {
        success: true,
        message: "Dziękujemy! Twoje zgłoszenie zostało przyjęte.",
        dataSent: false,
        reason: "missing_url",
      }
    }

    try {
      console.log("Server Action: rozpoczęcie wysyłania danych do:", scriptUrl)

      // Dodajemy kontroler do możliwości przerwania zapytania
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 sekund timeout

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        signal: controller.signal,
        cache: "no-store",
      })

      // Czyścimy timeout
      clearTimeout(timeoutId)

      console.log("Server Action: status odpowiedzi:", response.status)

      // Próbujemy pobrać tekst odpowiedzi
      const responseText = await response.text()
      console.log("Server Action: odpowiedź:", responseText)

      // Zwracamy sukces z informacją o wysłaniu
      return {
        success: true,
        message: "Dziękujemy! Twoje zgłoszenie zostało przyjęte.",
        dataSent: true,
        status: response.status,
      }
    } catch (fetchError) {
      console.error("Server Action: błąd podczas wysyłania danych:", fetchError)

      // Zwracamy sukces, ale z informacją o błędzie wysyłania
      return {
        success: true,
        message: "Dziękujemy! Twoje zgłoszenie zostało przyjęte.",
        dataSent: false,
        reason: "fetch_error",
      }
    }
  } catch (error) {
    console.error("Server Action: krytyczny błąd podczas przetwarzania formularza:", error)

    // Zwracamy sukces nawet w przypadku krytycznego błędu
    return {
      success: true,
      message: "Dziękujemy! Twoje zgłoszenie zostało przyjęte.",
      dataSent: false,
      reason: "critical_error",
    }
  }
}
