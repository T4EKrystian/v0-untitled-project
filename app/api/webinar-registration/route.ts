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

    // Znany webinar ID z URL
    const knownWebinarId = "VDWKD"
    console.log("Server: Próbuję użyć znanego webinar ID:", knownWebinarId)

    // Próba bezpośredniej rejestracji z znanym ID
    try {
      console.log("Server: Próba bezpośredniej rejestracji na webinar...")
      const registrationPayload = {
        email: email,
        name: name,
      }

      console.log("Server: Registration payload:", registrationPayload)

      const directResponse = await fetch(`https://api.getresponse.com/v3/webinars/${knownWebinarId}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
        body: JSON.stringify(registrationPayload),
      })

      console.log("Server: Direct registration status:", directResponse.status)
      console.log("Server: Direct registration headers:", Object.fromEntries(directResponse.headers.entries()))

      if (directResponse.ok) {
        const parseResult = await safeJsonParse(directResponse)

        if (parseResult.isEmpty) {
          console.log("Server: ✅ Webinar registration successful (empty response)")
          return NextResponse.json({
            success: true,
            message: "Rejestracja na webinar zakończona pomyślnie! Sprawdź swoją skrzynkę email.",
            debug: {
              method: "webinar_registration_empty_response",
              webinarId: knownWebinarId,
              status: directResponse.status,
            },
          })
        } else if (parseResult.data) {
          console.log("Server: ✅ Webinar registration successful:", parseResult.data)
          return NextResponse.json({
            success: true,
            data: parseResult.data,
            message: "Rejestracja na webinar zakończona pomyślnie! Sprawdź swoją skrzynkę email.",
            debug: {
              method: "webinar_registration",
              webinarId: knownWebinarId,
              registrationId: parseResult.data.registrationId || parseResult.data.id,
            },
          })
        } else {
          console.log("Server: ⚠️ Webinar registration - parse error but status OK")
          return NextResponse.json({
            success: true,
            message: "Rejestracja na webinar zakończona pomyślnie! Sprawdź swoją skrzynkę email.",
            debug: {
              method: "webinar_registration_parse_error",
              webinarId: knownWebinarId,
              parseError: parseResult.parseError,
            },
          })
        }
      } else {
        const parseResult = await safeJsonParse(directResponse)
        console.log("Server: ❌ Direct webinar registration failed:", parseResult)
      }
    } catch (directError) {
      console.error("Server: ❌ Direct registration exception:", directError)
    }

    // Fallback - zarządzanie kontaktem
    console.log("Server: Fallback - zarządzanie kontaktem...")

    try {
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

        if (searchParseResult.data && Array.isArray(searchParseResult.data)) {
          const existingContacts = searchParseResult.data
          console.log("Server: Existing contacts found:", existingContacts.length)

          if (existingContacts.length > 0) {
            // Kontakt już istnieje
            const existingContact = existingContacts[0]
            console.log("Server: ✅ Contact already exists:", existingContact.contactId)

            return NextResponse.json({
              success: true,
              data: existingContact,
              message: "Dziękujemy za zainteresowanie! Jesteś już w naszej bazie kontaktów.",
              debug: {
                method: "contact_exists",
                contactId: existingContact.contactId,
                wasExisting: true,
              },
            })
          }
        }
      }

      // Jeśli kontakt nie istnieje, dodaj go
      console.log("Server: Dodawanie nowego kontaktu...")

      // Pobierz listy
      const listsResponse = await fetch("https://api.getresponse.com/v3/campaigns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      })

      console.log("Server: Lists response status:", listsResponse.status)

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
            }

            console.log("Server: New contact payload:", contactPayload)

            const contactResponse = await fetch("https://api.getresponse.com/v3/contacts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-Auth-Token": `api-key ${apiKey}`,
              },
              body: JSON.stringify(contactPayload),
            })

            console.log("Server: New contact response status:", contactResponse.status)

            if (contactResponse.ok) {
              const contactParseResult = await safeJsonParse(contactResponse)

              if (contactParseResult.isEmpty) {
                console.log("Server: ✅ Contact added (empty response)")
                return NextResponse.json({
                  success: true,
                  message: "Rejestracja zakończona pomyślnie! Skontaktujemy się z Tobą wkrótce.",
                  debug: {
                    method: "new_contact_empty_response",
                    listId: listId,
                  },
                })
              } else if (contactParseResult.data) {
                console.log("Server: ✅ New contact added:", contactParseResult.data)
                return NextResponse.json({
                  success: true,
                  data: contactParseResult.data,
                  message: "Rejestracja zakończona pomyślnie! Skontaktujemy się z Tobą wkrótce.",
                  debug: {
                    method: "new_contact",
                    listId: listId,
                    contactId: contactParseResult.data.contactId,
                  },
                })
              } else {
                console.log("Server: ⚠️ Contact added but parse error")
                return NextResponse.json({
                  success: true,
                  message: "Rejestracja zakończona pomyślnie! Skontaktujemy się z Tobą wkrótce.",
                  debug: {
                    method: "new_contact_parse_error",
                    listId: listId,
                    parseError: contactParseResult.parseError,
                  },
                })
              }
            } else {
              const contactParseResult = await safeJsonParse(contactResponse)
              console.error("Server: ❌ New contact error:", contactParseResult)

              // Sprawdź czy to błąd duplikatu
              if (
                contactParseResult.data &&
                (contactParseResult.data.code === 1008 ||
                  (typeof contactParseResult.data === "string" &&
                    contactParseResult.data.includes("Contact already added")))
              ) {
                return NextResponse.json({
                  success: true,
                  message: "Dziękujemy za zainteresowanie! Jesteś już w naszej bazie kontaktów.",
                  debug: {
                    method: "duplicate_detected",
                    error: "Contact already exists",
                  },
                })
              }

              return NextResponse.json(
                {
                  success: false,
                  message: "Błąd podczas dodawania kontaktu",
                  error: contactParseResult.parseError || "Unknown error",
                  debug: {
                    method: "contact_failed",
                    error: contactParseResult.parseError,
                    rawData: contactParseResult.data,
                  },
                },
                { status: 500 },
              )
            }
          } else {
            console.log("Server: ❌ No lists available")
            return NextResponse.json(
              {
                success: false,
                message: "Brak dostępnych list kontaktów",
                error: "No campaigns found",
                debug: { method: "no_lists" },
              },
              { status: 500 },
            )
          }
        } else {
          console.log("Server: ❌ Lists parse error")
          return NextResponse.json(
            {
              success: false,
              message: "Błąd podczas pobierania list kontaktów",
              error: "Parse error",
              debug: { method: "lists_parse_failed", parseError: listsParseResult.parseError },
            },
            { status: 500 },
          )
        }
      } else {
        const listsParseResult = await safeJsonParse(listsResponse)
        console.error("Server: ❌ Lists request failed:", listsParseResult)

        return NextResponse.json(
          {
            success: false,
            message: "Błąd podczas pobierania list kontaktów",
            error: listsParseResult.parseError || "Request failed",
            debug: { method: "lists_request_failed", error: listsParseResult.parseError },
          },
          { status: 500 },
        )
      }
    } catch (listError) {
      console.error("Server: ❌ Contact management exception:", listError)

      return NextResponse.json(
        {
          success: false,
          message: "Błąd podczas zarządzania kontaktem",
          error: listError.message,
          debug: { method: "contact_exception", error: listError.message },
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
