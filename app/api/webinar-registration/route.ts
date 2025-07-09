import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    console.log("=== WEBINAR REGISTRATION DEBUG ===")
    console.log("Server: Otrzymane dane:", { name, email, phone })
    console.log("Server: Timestamp:", new Date().toISOString())

    // Najpierw spróbuj wysłać do Google Apps Script (jako backup)
    const googleScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
    console.log("Server: Google Apps Script URL:", googleScriptUrl ? "USTAWIONY" : "BRAK")

    if (googleScriptUrl) {
      try {
        console.log("Server: Wysyłanie do Google Apps Script...")
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

        console.log("Server: Google Apps Script status:", googleResponse.status)

        if (googleResponse.ok) {
          const googleResult = await googleResponse.text()
          console.log("Server: Google Apps Script response:", googleResult)
          console.log("Server: ✅ Pomyślnie wysłano do Google Apps Script")
        } else {
          const googleError = await googleResponse.text()
          console.log("Server: ❌ Błąd Google Apps Script:", googleError)
        }
      } catch (googleError) {
        console.error("Server: ❌ Wyjątek Google Apps Script:", googleError)
      }
    }

    // Następnie spróbuj GetResponse
    const apiKey = "wic2ysqcn4we1qmg9u2e8s67gd1v64c5"
    console.log("Server: GetResponse API Key:", apiKey ? "USTAWIONY" : "BRAK")

    // Test połączenia z GetResponse - sprawdź konto
    console.log("Server: Sprawdzanie połączenia z GetResponse...")
    try {
      const accountResponse = await fetch("https://api.getresponse.com/v3/accounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      })

      console.log("Server: GetResponse account status:", accountResponse.status)

      if (accountResponse.ok) {
        const accountData = await accountResponse.json()
        console.log("Server: ✅ GetResponse account:", accountData)
      } else {
        const accountError = await accountResponse.text()
        console.log("Server: ❌ GetResponse account error:", accountError)
      }
    } catch (accountError) {
      console.error("Server: ❌ GetResponse account exception:", accountError)
    }

    // Sprawdź dostępne webinary
    console.log("Server: Sprawdzanie dostępnych webinarów...")
    try {
      const webinarsResponse = await fetch("https://api.getresponse.com/v3/webinars", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      })

      console.log("Server: Webinars response status:", webinarsResponse.status)

      if (webinarsResponse.ok) {
        const webinars = await webinarsResponse.json()
        console.log("Server: ✅ Dostępne webinary:", JSON.stringify(webinars, null, 2))

        if (webinars.length > 0) {
          const webinar = webinars[0]
          const webinarId = webinar.webinarId
          console.log("Server: Używam webinar ID:", webinarId)

          // Spróbuj zarejestrować uczestnika
          console.log("Server: Rejestrowanie uczestnika...")
          const registrationPayload = {
            email: email,
            name: name,
          }

          console.log("Server: Registration payload:", JSON.stringify(registrationPayload, null, 2))

          const registrationResponse = await fetch(
            `https://api.getresponse.com/v3/webinars/${webinarId}/registrations`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": `api-key ${apiKey}`,
              },
              body: JSON.stringify(registrationPayload),
            },
          )

          console.log("Server: Registration response status:", registrationResponse.status)

          if (registrationResponse.ok) {
            const result = await registrationResponse.json()
            console.log("Server: ✅ Pomyślnie zarejestrowano w GetResponse:", JSON.stringify(result, null, 2))

            return NextResponse.json({
              success: true,
              data: result,
              message: "Rejestracja zakończona pomyślnie! Sprawdź swoją skrzynkę email.",
              debug: {
                googleScript: googleScriptUrl ? "sent" : "not_configured",
                getResponse: "success",
                webinarId: webinarId,
              },
            })
          } else {
            const errorData = await registrationResponse.text()
            console.error("Server: ❌ Błąd rejestracji GetResponse:", errorData)

            return NextResponse.json({
              success: true,
              message: "Rejestracja została przyjęta! Skontaktujemy się z Tobą wkrótce.",
              debug: {
                googleScript: googleScriptUrl ? "sent" : "not_configured",
                getResponse: "failed",
                error: errorData,
              },
            })
          }
        } else {
          console.log("Server: ❌ Brak dostępnych webinarów")
          return NextResponse.json({
            success: true,
            message: "Rejestracja została przyjęta! Skontaktujemy się z Tobą wkrótce.",
            debug: {
              googleScript: googleScriptUrl ? "sent" : "not_configured",
              getResponse: "no_webinars",
            },
          })
        }
      } else {
        const webinarsError = await webinarsResponse.text()
        console.error("Server: ❌ Błąd pobierania webinarów:", webinarsError)

        return NextResponse.json({
          success: true,
          message: "Rejestracja została przyjęta! Skontaktujemy się z Tobą wkrótce.",
          debug: {
            googleScript: googleScriptUrl ? "sent" : "not_configured",
            getResponse: "webinars_error",
            error: webinarsError,
          },
        })
      }
    } catch (webinarsError) {
      console.error("Server: ❌ Wyjątek webinars:", webinarsError)

      return NextResponse.json({
        success: true,
        message: "Rejestracja została przyjęta! Skontaktujemy się z Tobą wkrótce.",
        debug: {
          googleScript: googleScriptUrl ? "sent" : "not_configured",
          getResponse: "exception",
          error: webinarsError.message,
        },
      })
    }
  } catch (error) {
    console.error("Server: ❌ Ogólny błąd:", error)

    return NextResponse.json({
      success: true,
      message: "Rejestracja została przyjęta! Dziękujemy za zainteresowanie.",
      debug: {
        error: error.message,
        timestamp: new Date().toISOString(),
      },
    })
  }
}
