import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    console.log("=== WEBINAR REGISTRATION DEBUG ===")
    console.log("Server: Otrzymane dane:", { name, email, phone })
    console.log("Server: Timestamp:", new Date().toISOString())

    // GetResponse API
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

        return NextResponse.json(
          {
            success: false,
            message: "Błąd połączenia z systemem rejestracji",
            error: "Invalid API credentials",
          },
          { status: 400 },
        )
      }
    } catch (accountError) {
      console.error("Server: ❌ GetResponse account exception:", accountError)

      return NextResponse.json(
        {
          success: false,
          message: "Błąd połączenia z systemem rejestracji",
          error: "Connection failed",
        },
        { status: 500 },
      )
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
                getResponse: "success",
                webinarId: webinarId,
                registrationId: result.registrationId || result.id,
              },
            })
          } else {
            const errorData = await registrationResponse.text()
            console.error("Server: ❌ Błąd rejestracji GetResponse:", errorData)

            return NextResponse.json(
              {
                success: false,
                message: "Błąd podczas rejestracji",
                error: errorData,
                debug: {
                  getResponse: "registration_failed",
                  webinarId: webinarId,
                  error: errorData,
                },
              },
              { status: 400 },
            )
          }
        } else {
          console.log("Server: ❌ Brak dostępnych webinarów")

          return NextResponse.json(
            {
              success: false,
              message: "Brak dostępnych webinarów",
              error: "No webinars available",
              debug: {
                getResponse: "no_webinars",
              },
            },
            { status: 404 },
          )
        }
      } else {
        const webinarsError = await webinarsResponse.text()
        console.error("Server: ❌ Błąd pobierania webinarów:", webinarsError)

        return NextResponse.json(
          {
            success: false,
            message: "Błąd pobierania webinarów",
            error: webinarsError,
            debug: {
              getResponse: "webinars_error",
              error: webinarsError,
            },
          },
          { status: 400 },
        )
      }
    } catch (webinarsError) {
      console.error("Server: ❌ Wyjątek webinars:", webinarsError)

      return NextResponse.json(
        {
          success: false,
          message: "Błąd połączenia z systemem webinarów",
          error: webinarsError.message,
          debug: {
            getResponse: "exception",
            error: webinarsError.message,
          },
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Server: ❌ Ogólny błąd:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Wystąpił nieoczekiwany błąd",
        error: error.message,
        debug: {
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}
