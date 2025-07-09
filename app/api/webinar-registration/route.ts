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

// Funkcja do sprawdzania dostępnych webinarów
async function getAvailableWebinars(apiKey: string) {
  try {
    console.log("Server: Pobieranie listy webinarów...")
    const response = await fetch("https://api.getresponse.com/v3/webinars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `api-key ${apiKey}`,
      },
    })

    console.log("Server: Webinars list status:", response.status)

    if (response.ok) {
      const parseResult = await safeJsonParse(response)
      if (parseResult.data && Array.isArray(parseResult.data)) {
        console.log("Server: Found webinars:", parseResult.data.length)
        parseResult.data.forEach((webinar, index) => {
          console.log(`Server: Webinar ${index + 1}:`, {
            id: webinar.webinarId,
            name: webinar.name,
            status: webinar.status,
            startsOn: webinar.startsOn,
            registrationEnabled: webinar.registrationEnabled,
          })
        })
        return parseResult.data
      }
    }
    return []
  } catch (error) {
    console.error("Server: Error getting webinars:", error)
    return []
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

    // Najpierw sprawdź dostępne webinary
    const availableWebinars = await getAvailableWebinars(apiKey)

    if (availableWebinars.length > 0) {
      // Znajdź aktywny webinar z otwartymi rejestracjami
      const activeWebinar = availableWebinars.find(
        (webinar) => webinar.status === "published" && webinar.registrationEnabled === true,
      )

      if (activeWebinar) {
        console.log("Server: Znaleziono aktywny webinar:", activeWebinar.webinarId)

        try {
          const registrationPayload = {
            email: email,
            name: name,
          }

          console.log("Server: Rejestracja na webinar:", activeWebinar.webinarId)

          const webinarResponse = await fetch(
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

          console.log("Server: Webinar registration status:", webinarResponse.status)

          if (webinarResponse.ok) {
            const parseResult = await safeJsonParse(webinarResponse)
            console.log("Server: ✅ Webinar registration successful!")

            return NextResponse.json({
              success: true,
              data: parseResult.data,
              message:
                "Rejestracja na webinar zakończona pomyślnie! Sprawdź swoją skrzynkę email z informacjami o webinarze.",
              debug: {
                method: "webinar_registration_success",
                webinarId: activeWebinar.webinarId,
                webinarName: activeWebinar.name,
                registrationId: parseResult.data?.registrationId || parseResult.data?.id,
              },
            })
          } else {
            const parseResult = await safeJsonParse(webinarResponse)
            console.log("Server: ❌ Webinar registration failed:", parseResult)

            // Sprawdź czy to błąd duplikatu
            if (
              parseResult.data &&
              (parseResult.data.code === 1008 ||
                (typeof parseResult.data === "string" && parseResult.data.includes("already registered")))
            ) {
              return NextResponse.json({
                success: true,
                message: "Jesteś już zarejestrowany na ten webinar! Sprawdź swoją skrzynkę email.",
                debug: {
                  method: "webinar_already_registered",
                  webinarId: activeWebinar.webinarId,
                },
              })
            }
          }
        } catch (webinarError) {
          console.error("Server: ❌ Webinar registration exception:", webinarError)
        }
      } else {
        console.log("Server: ⚠️ Brak aktywnych webinarów z otwartymi rejestracjami")

        // Pokaż wszystkie webinary dla debugowania
        availableWebinars.forEach((webinar) => {
          console.log("Server: Webinar details:", {
            id: webinar.webinarId,
            name: webinar.name,
            status: webinar.status,
            registrationEnabled: webinar.registrationEnabled,
            startsOn: webinar.startsOn,
          })
        })
      }
    } else {
      console.log("Server: ⚠️ Brak dostępnych webinarów")
    }

    // Fallback - dodaj do listy kontaktów
    console.log("Server: Fallback - dodawanie do listy kontaktów...")

    try {
      // Sprawdź czy kontakt już istnieje
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

      if (searchResponse.ok) {
        const searchParseResult = await safeJsonParse(searchResponse)

        if (searchParseResult.data && Array.isArray(searchParseResult.data)) {
          const existingContacts = searchParseResult.data
          console.log("Server: Existing contacts found:", existingContacts.length)

          if (existingContacts.length > 0) {
            const existingContact = existingContacts[0]
            console.log("Server: ✅ Contact already exists:", existingContact.contactId)

            return NextResponse.json({
              success: true,
              data: existingContact,
              message: "Dodano Cię do listy kontaktów. Skontaktujemy się z Tobą w sprawie webinaru.",
              debug: {
                method: "contact_exists_no_webinar",
                contactId: existingContact.contactId,
                availableWebinars: availableWebinars.length,
                webinarIssue: "No active webinars with open registration",
              },
            })
          }
        }
      }

      // Dodaj nowy kontakt
      const listsResponse = await fetch("https://api.getresponse.com/v3/campaigns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      })

      if (listsResponse.ok) {
        const listsParseResult = await safeJsonParse(listsResponse)

        if (listsParseResult.data && Array.isArray(listsParseResult.data)) {
          const lists = listsParseResult.data
          console.log("Server: Available lists:", lists.length)

          if (lists.length > 0) {
            const listId = lists[0].campaignId
            console.log("Server: Using list ID:", listId)

            const contactPayload = {
              email: email,
              name: name,
              campaign: { campaignId: listId },
              // Dodaj custom field wskazujący zainteresowanie webinarem
              customFieldValues: [
                {
                  customFieldId: "webinar_interest",
                  value: ["true"],
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
              const contactParseResult = await safeJsonParse(contactResponse)
              console.log("Server: ✅ New contact added to list")

              return NextResponse.json({
                success: true,
                data: contactParseResult.data,
                message: "Dodano Cię do listy kontaktów. Skontaktujemy się z Tobą w sprawie webinaru.",
                debug: {
                  method: "new_contact_no_webinar",
                  listId: listId,
                  contactId: contactParseResult.data?.contactId,
                  availableWebinars: availableWebinars.length,
                  webinarIssue: "No active webinars with open registration",
                },
              })
            }
          }
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: "Nie udało się dodać do listy kontaktów",
          error: "Contact creation failed",
          debug: { method: "contact_creation_failed" },
        },
        { status: 500 },
      )
    } catch (contactError) {
      console.error("Server: ❌ Contact management exception:", contactError)

      return NextResponse.json(
        {
          success: false,
          message: "Błąd podczas zarządzania kontaktem",
          error: contactError.message,
          debug: { method: "contact_exception", error: contactError.message },
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
