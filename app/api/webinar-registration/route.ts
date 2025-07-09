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

    // Test połączenia z GetResponse
    try {
      console.log("Server: Test połączenia z GetResponse...")
      const testResponse = await fetch("https://api.getresponse.com/v3/accounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": `api-key ${apiKey}`,
        },
      })

      console.log("Server: Test response status:", testResponse.status)

      if (!testResponse.ok) {
        const testError = await testResponse.text()
        console.log("Server: ❌ Test connection failed:", testError)

        return NextResponse.json(
          {
            success: false,
            message: "Błąd połączenia z systemem rejestracji",
            error: "API connection failed",
            debug: { testError, status: testResponse.status },
          },
          { status: 500 },
        )
      }

      const accountData = await testResponse.json()
      console.log("Server: ✅ Connection OK, account:", accountData)
    } catch (testError) {
      console.error("Server: ❌ Connection test exception:", testError)

      return NextResponse.json(
        {
          success: false,
          message: "Błąd połączenia z systemem rejestracji",
          error: "Connection exception",
          debug: { error: testError.message },
        },
        { status: 500 },
      )
    }

    // Próba bezpośredniej rejestracji z znanym ID
    try {
      console.log("Server: Próba bezpośredniej rejestracji...")
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

      if (directResponse.ok) {
        const result = await directResponse.json()
        console.log("Server: ✅ Bezpośrednia rejestracja OK:", result)

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
        const directError = await directResponse.text()
        console.log("Server: ❌ Direct registration error:", directError)
      }
    } catch (directError) {
      console.error("Server: ❌ Direct registration exception:", directError)
    }

    // Fallback - dodaj do listy kontaktów
    console.log("Server: Fallback - dodawanie do listy kontaktów...")

    try {
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
        const lists = await listsResponse.json()
        console.log("Server: Available lists:", lists.length)

        if (lists.length > 0) {
          const listId = lists[0].campaignId
          console.log("Server: Using list ID:", listId)

          // Uproszczony payload dla kontaktu
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

          console.log("Server: Contact response status:", contactResponse.status)

          if (contactResponse.ok) {
            const contactResult = await contactResponse.json()
            console.log("Server: ✅ Contact added:", contactResult)

            return NextResponse.json({
              success: true,
              data: contactResult,
              message: "Rejestracja zakończona pomyślnie! Skontaktujemy się z Tobą wkrótce.",
              debug: {
                method: "contact_list",
                listId: listId,
                contactId: contactResult.contactId,
              },
            })
          } else {
            const contactError = await contactResponse.text()
            console.error("Server: ❌ Contact error:", contactError)

            return NextResponse.json(
              {
                success: false,
                message: "Błąd podczas dodawania do listy kontaktów",
                error: contactError,
                debug: { method: "contact_failed", error: contactError },
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
        const listsError = await listsResponse.text()
        console.error("Server: ❌ Lists error:", listsError)

        return NextResponse.json(
          {
            success: false,
            message: "Błąd podczas pobierania list kontaktów",
            error: listsError,
            debug: { method: "lists_failed", error: listsError },
          },
          { status: 500 },
        )
      }
    } catch (listError) {
      console.error("Server: ❌ List exception:", listError)

      return NextResponse.json(
        {
          success: false,
          message: "Błąd podczas dodawania do listy kontaktów",
          error: listError.message,
          debug: { method: "list_exception", error: listError.message },
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
