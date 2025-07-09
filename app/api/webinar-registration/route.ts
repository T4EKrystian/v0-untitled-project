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

    // Znany webinar ID z URL
    const knownWebinarId = "VDWKD"
    console.log("Server: Próbuję użyć znanego webinar ID:", knownWebinarId)

    // Najpierw spróbuj bezpośrednio z znanym ID
    try {
      console.log("Server: Próba bezpośredniej rejestracji z znanym ID...")
      const registrationPayload = {
        email: email,
        name: name,
      }

      console.log("Server: Registration payload:", JSON.stringify(registrationPayload, null, 2))

      const directRegistrationResponse = await fetch(
        `https://api.getresponse.com/v3/webinars/${knownWebinarId}/registrations`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": `api-key ${apiKey}`,
          },
          body: JSON.stringify(registrationPayload),
        },
      )

      console.log("Server: Direct registration response status:", directRegistrationResponse.status)

      if (directRegistrationResponse.ok) {
        const result = await directRegistrationResponse.json()
        console.log("Server: ✅ Pomyślnie zarejestrowano bezpośrednio:", JSON.stringify(result, null, 2))

        return NextResponse.json({
          success: true,
          data: result,
          message: "Rejestracja zakończona pomyślnie! Sprawdź swoją skrzynkę email.",
          debug: {
            method: "direct_registration",
            webinarId: knownWebinarId,
            registrationId: result.registrationId || result.id,
          },
        })
      } else {
        const directError = await directRegistrationResponse.text()
        console.log("Server: ❌ Błąd bezpośredniej rejestracji:", directError)
      }
    } catch (directError) {
      console.error("Server: ❌ Wyjątek bezpośredniej rejestracji:", directError)
    }

    // Jeśli bezpośrednia rejestracja nie działa, sprawdź dostępne webinary
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
          // Znajdź webinar z ID VDWKD lub pierwszy dostępny
          const selectedWebinar = webinars.find((w) => w.webinarId === knownWebinarId) || webinars[0]

          console.log("Server: Wybrany webinar:", {
            webinarId: selectedWebinar.webinarId,
            name: selectedWebinar.name,
            status: selectedWebinar.status,
            startsOn: selectedWebinar.startsOn,
            registrationSettings: selectedWebinar.registrationSettings,
          })

          const webinarId = selectedWebinar.webinarId
          console.log("Server: Używam webinar ID:", webinarId)

          // Spróbuj zarejestrować uczestnika
          console.log("Server: Rejestrowanie uczestnika...")
          const registrationPayload = {
            email: email,
            name: name,
          }

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
            console.log("Server: ✅ Pomyślnie zarejestrowano:", JSON.stringify(result, null, 2))

            return NextResponse.json({
              success: true,
              data: result,
              message: "Rejestracja zakończona pomyślnie! Sprawdź swoją skrzynkę email.",
              debug: {
                method: "api_registration",
                webinarId: webinarId,
                webinarName: selectedWebinar.name,
                registrationId: result.registrationId || result.id,
              },
            })
          } else {
            const errorData = await registrationResponse.text()
            console.error("Server: ❌ Błąd rejestracji:", errorData)

            // Fallback - dodaj do listy kontaktów
            return await addToContactList(apiKey, name, email, phone, {
              webinarError: errorData,
              webinarId: webinarId,
            })
          }
        } else {
          console.log("Server: ❌ Brak webinarów")
          return await addToContactList(apiKey, name, email, phone, { reason: "no_webinars" })
        }
      } else {
        const webinarsError = await webinarsResponse.text()
        console.error("Server: ❌ Błąd pobierania webinarów:", webinarsError)
        return await addToContactList(apiKey, name, email, phone, { webinarsError })
      }
    } catch (webinarsError) {
      console.error("Server: ❌ Wyjątek webinars:", webinarsError)
      return await addToContactList(apiKey, name, email, phone, { exception: webinarsError.message })
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

// Funkcja pomocnicza do dodawania do listy kontaktów
async function addToContactList(apiKey: string, name: string, email: string, phone: string, debugInfo: any) {
  try {
    console.log("Server: Próbuję dodać do listy kontaktów jako fallback...")

    // Pobierz dostępne listy
    const listsResponse = await fetch("https://api.getresponse.com/v3/campaigns", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `api-key ${apiKey}`,
      },
    })

    if (listsResponse.ok) {
      const lists = await listsResponse.json()
      console.log("Server: Dostępne listy:", lists)

      if (lists.length > 0) {
        const listId = lists[0].campaignId
        console.log("Server: Dodaję do listy:", listId)

        const contactPayload = {
          email: email,
          name: name,
          campaign: { campaignId: listId },
          customFieldValues: [
            {
              customFieldId: "phone",
              value: [phone],
            },
          ],
        }

        const contactResponse = await fetch("https://api.getresponse.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": `api-key ${apiKey}`,
          },
          body: JSON.stringify(contactPayload),
        })

        if (contactResponse.ok) {
          const contactResult = await contactResponse.json()
          console.log("Server: ✅ Dodano do listy kontaktów:", contactResult)

          return NextResponse.json({
            success: true,
            data: contactResult,
            message: "Rejestracja zakończona pomyślnie! Skontaktujemy się z Tobą wkrótce.",
            debug: {
              method: "contact_list_fallback",
              listId: listId,
              contactId: contactResult.contactId,
              originalError: debugInfo,
            },
          })
        } else {
          const contactError = await contactResponse.text()
          console.error("Server: Błąd dodawania do listy:", contactError)
        }
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: "Błąd podczas rejestracji",
        error: "Could not register for webinar or add to contact list",
        debug: {
          method: "all_failed",
          originalError: debugInfo,
        },
      },
      { status: 500 },
    )
  } catch (listError) {
    console.error("Server: Błąd fallback do listy:", listError)

    return NextResponse.json(
      {
        success: false,
        message: "Błąd podczas rejestracji",
        error: listError.message,
        debug: {
          method: "fallback_exception",
          error: listError.message,
          originalError: debugInfo,
        },
      },
      { status: 500 },
    )
  }
}
