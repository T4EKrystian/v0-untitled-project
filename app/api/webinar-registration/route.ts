import { type NextRequest, NextResponse } from "next/server"

// Pomocnicza funkcja do bezpiecznego parsowania JSON
async function safeJsonParse(response: Response) {
  try {
    const text = await response.text()
    console.log("Server: Raw response text:", text)

    if (!text || text.trim() === "") {
      console.log("Server: Empty response body")
      return { isEmpty: true, data: null }
    }

    const json = JSON.parse(text)
    return { isEmpty: false, data: json }
  } catch (error) {
    console.error("Server: JSON parse error:", error)
    return { isEmpty: false, data: null, parseError: error.message }
  }
}

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

    // KROK 1: Sprawdź dostępne webinary
    console.log("Server: KROK 1 - Sprawdzanie webinarów...")
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
        const webinarsParseResult = await safeJsonParse(webinarsResponse)

        if (webinarsParseResult.data && Array.isArray(webinarsParseResult.data)) {
          const webinars = webinarsParseResult.data
          console.log("Server: Found webinars:", webinars.length)

          // Loguj szczegóły każdego webinaru
          webinars.forEach((webinar, index) => {
            console.log(`Server: Webinar ${index + 1}:`, {
              id: webinar.webinarId,
              name: webinar.name,
              status: webinar.status,
              registrationEnabled: webinar.registrationEnabled,
              startsOn: webinar.startsOn,
            })
          })

          // Znajdź aktywny webinar
          const activeWebinar = webinars.find(
            (webinar) => webinar.status === "published" && webinar.registrationEnabled === true,
          )

          if (activeWebinar) {
            console.log("Server: PRÓBA REJESTRACJI NA WEBINAR:", activeWebinar.webinarId)

            const registrationPayload = {
              email: email,
              name: name,
            }

            const webinarRegResponse = await fetch(
              `https://api.getresponse.com/v3/webinars/${activeWebinar.webinarId}/registrations`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "X-Auth-Token": `api-key ${apiKey}`,
                },
                body: JSON.stringify(registrationPayload),
              },
            )

            console.log("Server: Webinar registration status:", webinarRegResponse.status)

            if (webinarRegResponse.ok) {
              const regParseResult = await safeJsonParse(webinarRegResponse)
              console.log("Server: ✅ WEBINAR REGISTRATION SUCCESS!")

              return NextResponse.json({
                success: true,
                data: regParseResult.data,
                message: "Rejestracja na webinar zakończona pomyślnie! Sprawdź swoją skrzynkę email.",
                debug: {
                  method: "webinar_registration_success",
                  webinarId: activeWebinar.webinarId,
                  webinarName: activeWebinar.name,
                },
              })
            } else {
              const regErrorResult = await safeJsonParse(webinarRegResponse)
              console.log("Server: ❌ Webinar registration failed:", regErrorResult)
            }
          } else {
            console.log("Server: ⚠️ Brak aktywnych webinarów")
          }
        }
      } else {
        console.log("Server: ❌ Nie udało się pobrać webinarów")
      }
    } catch (webinarError) {
      console.error("Server: ❌ Webinar check error:", webinarError)
    }

    // KROK 2: Fallback - dodaj do listy kontaktów
    console.log("Server: KROK 2 - Dodawanie do listy kontaktów...")

    try {
      // Najpierw pobierz listy
      console.log("Server: Pobieranie list kontaktów...")
      const listsResponse = await fetch("https://api.getresponse.com/v3/campaigns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      })

      console.log("Server: Lists response status:", listsResponse.status)

      if (!listsResponse.ok) {
        const listsError = await safeJsonParse(listsResponse)
        console.error("Server: ❌ Lists request failed:", listsError)
        throw new Error(`Lists request failed: ${listsResponse.status}`)
      }

      const listsParseResult = await safeJsonParse(listsResponse)

      if (!listsParseResult.data || !Array.isArray(listsParseResult.data)) {
        console.error("Server: ❌ Invalid lists data:", listsParseResult)
        throw new Error("Invalid lists data")
      }

      const lists = listsParseResult.data
      console.log("Server: Available lists:", lists.length)

      if (lists.length === 0) {
        throw new Error("No campaigns/lists available")
      }

      const listId = lists[0].campaignId
      console.log("Server: Using list ID:", listId)

      // Sprawdź czy kontakt już istnieje
      console.log("Server: Sprawdzanie czy kontakt istnieje...")
      const searchResponse = await fetch(
        `https://api.getresponse.com/v3/contacts?query[email]=${encodeURIComponent(email)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": `api-key ${apiKey}`,
          },
        },
      )

      console.log("Server: Search response status:", searchResponse.status)

      if (searchResponse.ok) {
        const searchParseResult = await safeJsonParse(searchResponse)

        if (searchParseResult.data && Array.isArray(searchParseResult.data) && searchParseResult.data.length > 0) {
          const existingContact = searchParseResult.data[0]
          console.log("Server: ✅ Contact already exists:", existingContact.contactId)

          return NextResponse.json({
            success: true,
            data: existingContact,
            message: "Jesteś już w naszej bazie kontaktów. Skontaktujemy się z Tobą w sprawie webinaru.",
            debug: {
              method: "contact_exists",
              contactId: existingContact.contactId,
            },
          })
        }
      }

      // Dodaj nowy kontakt
      console.log("Server: Dodawanie nowego kontaktu...")
      const contactPayload = {
        email: email,
        name: name,
        campaign: { campaignId: listId },
      }

      console.log("Server: Contact payload:", contactPayload)

      const contactResponse = await fetch("https://api.getresponse.com/v3/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
        body: JSON.stringify(contactPayload),
      })

      console.log("Server: Contact creation status:", contactResponse.status)

      if (contactResponse.ok) {
        const contactParseResult = await safeJsonParse(contactResponse)
        console.log("Server: ✅ NEW CONTACT ADDED!")

        return NextResponse.json({
          success: true,
          data: contactParseResult.data,
          message: "Dodano Cię do listy kontaktów. Skontaktujemy się z Tobą w sprawie webinaru.",
          debug: {
            method: "new_contact_added",
            listId: listId,
            contactId: contactParseResult.data?.contactId,
          },
        })
      } else {
        const contactErrorResult = await safeJsonParse(contactResponse)
        console.error("Server: ❌ Contact creation failed:", contactErrorResult)

        // Sprawdź czy to błąd duplikatu
        if (
          contactErrorResult.data &&
          (contactErrorResult.data.code === 1008 ||
            (typeof contactErrorResult.data === "string" && contactErrorResult.data.includes("already added")))
        ) {
          return NextResponse.json({
            success: true,
            message: "Jesteś już w naszej bazie kontaktów.",
            debug: {
              method: "duplicate_contact_detected",
            },
          })
        }

        throw new Error(
          `Contact creation failed: ${contactResponse.status} - ${contactErrorResult.parseError || "Unknown error"}`,
        )
      }
    } catch (contactError) {
      console.error("Server: ❌ Contact management error:", contactError)

      return NextResponse.json(
        {
          success: false,
          message: "Błąd podczas dodawania do listy kontaktów",
          error: contactError.message,
          debug: {
            method: "contact_management_failed",
            error: contactError.message,
          },
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Server: ❌ General error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Wystąpił nieoczekiwany błąd",
        error: error.message,
        debug: {
          method: "general_exception",
          error: error.message,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 },
    )
  }
}
