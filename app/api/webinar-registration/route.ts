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

// Funkcja do formatowania numeru telefonu - spróbujmy różnych formatów
function formatPhoneNumber(phone: string): string[] {
  // Usuń wszystkie znaki niebędące cyframi
  const cleanPhone = phone.replace(/\D/g, "")

  const formats = []

  // Format 1: +48 xxx xxx xxx (z spacjami)
  if (cleanPhone.length === 9) {
    const formatted = `+48 ${cleanPhone.substring(0, 3)} ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6)}`
    formats.push(formatted)
  }

  // Format 2: +48xxxxxxxxx (bez spacji)
  if (cleanPhone.length === 9) {
    formats.push(`+48${cleanPhone}`)
  }

  // Format 3: 48xxxxxxxxx (bez plusa)
  if (cleanPhone.length === 9) {
    formats.push(`48${cleanPhone}`)
  }

  // Format 4: xxxxxxxxx (tylko cyfry)
  if (cleanPhone.length === 9) {
    formats.push(cleanPhone)
  }

  // Format 5: xxx-xxx-xxx (z myślnikami)
  if (cleanPhone.length === 9) {
    const formatted = `${cleanPhone.substring(0, 3)}-${cleanPhone.substring(3, 6)}-${cleanPhone.substring(6)}`
    formats.push(formatted)
  }

  // Format 6: (xxx) xxx-xxx (z nawiasami)
  if (cleanPhone.length === 9) {
    const formatted = `(${cleanPhone.substring(0, 3)}) ${cleanPhone.substring(3, 6)}-${cleanPhone.substring(6)}`
    formats.push(formatted)
  }

  return formats
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    console.log("=== WEBINAR REGISTRATION DEBUG ===")
    console.log("Server: Otrzymane dane:", { name, email, phone })
    console.log("Server: Timestamp:", new Date().toISOString())

    // Przygotuj różne formaty numeru telefonu
    const phoneFormats = formatPhoneNumber(phone)
    console.log("Server: Original phone:", phone)
    console.log("Server: Phone formats to try:", phoneFormats)

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

    // KROK 2: Fallback - dodaj do listy kontaktów "wojciech"
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

      const listId = lists[0].campaignId
      const listName = lists[0].name
      console.log("Server: Using list:", { id: listId, name: listName })

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
              listUsed: listName,
              phoneFormats: phoneFormats,
            },
          })
        }
      }

      // Pobierz custom fields przed dodaniem nowego kontaktu
      console.log("Server: Pobieranie custom fields dla nowego kontaktu...")
      const customFieldsResponse = await fetch("https://api.getresponse.com/v3/custom-fields", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      })

      let phoneFields = []
      if (customFieldsResponse.ok) {
        const customFieldsResult = await safeJsonParse(customFieldsResponse)
        console.log("Server: Custom fields available:", customFieldsResult.data?.length || 0)

        if (customFieldsResult.data && Array.isArray(customFieldsResult.data)) {
          // Znajdź wszystkie pola telefonu
          phoneFields = customFieldsResult.data.filter((field) => {
            const fieldName = field.name.toLowerCase()
            return (
              fieldName.includes("phone") ||
              fieldName.includes("telefon") ||
              fieldName.includes("tel") ||
              fieldName.includes("mobile") ||
              field.type === "phone" ||
              field.valueType === "phone"
            )
          })

          console.log("Server: Found phone fields:", phoneFields.length)
          phoneFields.forEach((field, index) => {
            console.log(`Server: Phone field ${index + 1}:`, {
              id: field.customFieldId,
              name: field.name,
              type: field.type,
              fieldType: field.fieldType,
              valueType: field.valueType,
            })
          })
        }
      }

      // Spróbuj dodać kontakt z różnymi formatami telefonu
      let contactCreated = false
      let lastError = null

      for (let i = 0; i < phoneFormats.length && !contactCreated; i++) {
        const currentPhoneFormat = phoneFormats[i]
        console.log(`Server: Próba ${i + 1}/${phoneFormats.length} z formatem telefonu: "${currentPhoneFormat}"`)

        // Spróbuj z każdym polem telefonu
        for (let j = 0; j < phoneFields.length && !contactCreated; j++) {
          const phoneField = phoneFields[j]
          console.log(`Server: Próba z polem: ${phoneField.name} (${phoneField.customFieldId})`)

          const contactPayload = {
            email: email,
            name: name,
            campaign: { campaignId: listId },
            customFieldValues: [
              {
                customFieldId: phoneField.customFieldId,
                value: [currentPhoneFormat],
              },
            ],
          }

          console.log("Server: Contact payload:", JSON.stringify(contactPayload, null, 2))

          try {
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
              console.log("Server: ✅ NEW CONTACT ADDED WITH PHONE!")
              contactCreated = true

              return NextResponse.json({
                success: true,
                data: contactParseResult.data,
                message: "Dodano Cię do listy kontaktów. Skontaktujemy się z Tobą w sprawie webinaru.",
                debug: {
                  method: "new_contact_added_with_phone",
                  listId: listId,
                  listName: listName,
                  contactId: contactParseResult.data?.contactId,
                  phoneFieldUsed: phoneField.name,
                  phoneFieldId: phoneField.customFieldId,
                  phoneFormatUsed: currentPhoneFormat,
                  attemptNumber: i + 1,
                  fieldAttemptNumber: j + 1,
                },
              })
            } else {
              const contactErrorResult = await safeJsonParse(contactResponse)
              console.log(
                `Server: ❌ Contact creation failed with ${phoneField.name} and format "${currentPhoneFormat}":`,
                contactErrorResult,
              )
              lastError = contactErrorResult
            }
          } catch (error) {
            console.log(`Server: ❌ Error with ${phoneField.name} and format "${currentPhoneFormat}":`, error)
            lastError = error
          }
        }
      }

      // Jeśli wszystkie próby z telefonem się nie powiodły, dodaj bez telefonu
      if (!contactCreated) {
        console.log("Server: Wszystkie próby z telefonem się nie powiodły, dodaję kontakt bez telefonu...")

        const simpleContactPayload = {
          email: email,
          name: name,
          campaign: { campaignId: listId },
        }

        const simpleContactResponse = await fetch("https://api.getresponse.com/v3/contacts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": `api-key ${apiKey}`,
          },
          body: JSON.stringify(simpleContactPayload),
        })

        console.log("Server: Simple contact creation status:", simpleContactResponse.status)

        if (simpleContactResponse.ok) {
          const simpleContactParseResult = await safeJsonParse(simpleContactResponse)
          console.log("Server: ✅ NEW CONTACT ADDED (without phone)!")

          return NextResponse.json({
            success: true,
            data: simpleContactParseResult.data,
            message: "Dodano Cię do listy kontaktów. Skontaktujemy się z Tobą w sprawie webinaru.",
            debug: {
              method: "new_contact_added_without_phone",
              listId: listId,
              listName: listName,
              contactId: simpleContactParseResult.data?.contactId,
              phoneIncluded: false,
              note: "All phone formats failed, contact added without phone",
              phoneFormatsAttempted: phoneFormats,
              phoneFieldsAttempted: phoneFields.map((f) => f.name),
              lastError: lastError,
            },
          })
        } else {
          const simpleErrorResult = await safeJsonParse(simpleContactResponse)
          throw new Error(
            `Simple contact creation failed: ${simpleContactResponse.status} - ${JSON.stringify(simpleErrorResult.data)}`,
          )
        }
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
