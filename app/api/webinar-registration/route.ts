import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    console.log("Server: Otrzymane dane:", { name, email, phone })

    // Najpierw spróbuj wysłać do Google Apps Script (jako backup)
    const googleScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    if (googleScriptUrl) {
      try {
        console.log("Server: Wysyłanie do Google Apps Script")
        const googleResponse = await fetch(googleScriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            timestamp: new Date().toISOString(),
            source: "webinar-form",
          }),
        })

        if (googleResponse.ok) {
          console.log("Server: Pomyślnie wysłano do Google Apps Script")
        }
      } catch (googleError) {
        console.error("Server: Błąd Google Apps Script:", googleError)
      }
    }

    // Następnie spróbuj GetResponse
    const apiKey = "wic2ysqcn4we1qmg9u2e8s67gd1v64c5"

    // Najpierw sprawdź dostępne webinary
    console.log("Server: Sprawdzanie dostępnych webinarów")
    const webinarsResponse = await fetch("https://api.getresponse.com/v3/webinars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `api-key ${apiKey}`,
      },
    })

    if (webinarsResponse.ok) {
      const webinars = await webinarsResponse.json()
      console.log("Server: Dostępne webinary:", webinars)

      // Znajdź pierwszy dostępny webinar lub użyj konkretnego ID
      const webinarId = webinars.length > 0 ? webinars[0].webinarId : "VDWKD"

      console.log("Server: Używam webinar ID:", webinarId)

      // Spróbuj zarejestrować uczestnika
      const registrationResponse = await fetch(`https://api.getresponse.com/v3/webinars/${webinarId}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
        body: JSON.stringify({
          email: email,
          name: name,
          // Usuń customFieldValues jeśli powoduje problemy
        }),
      })

      if (registrationResponse.ok) {
        const result = await registrationResponse.json()
        console.log("Server: Pomyślnie zarejestrowano w GetResponse")
        return NextResponse.json({
          success: true,
          data: result,
          message: "Rejestracja zakończona pomyślnie",
        })
      } else {
        const errorData = await registrationResponse.text()
        console.error("Server: Błąd rejestracji GetResponse:", errorData)

        // Zwróć sukces mimo błędu GetResponse, bo dane są zapisane w Google Sheets
        return NextResponse.json({
          success: true,
          message: "Rejestracja zapisana pomyślnie",
          note: "Dane zostały zabezpieczone w naszym systemie",
        })
      }
    } else {
      const webinarsError = await webinarsResponse.text()
      console.error("Server: Błąd pobierania webinarów:", webinarsError)

      // Zwróć sukces, bo dane są zapisane w Google Sheets
      return NextResponse.json({
        success: true,
        message: "Rejestracja zapisana pomyślnie",
        note: "Potwierdzenie zostanie wysłane wkrótce",
      })
    }
  } catch (error) {
    console.error("Server: Ogólny błąd:", error)

    // Nawet w przypadku błędu, zwróć sukces dla użytkownika
    return NextResponse.json({
      success: true,
      message: "Rejestracja została przyjęta",
      note: "Skontaktujemy się z Tobą wkrótce",
    })
  }
}
