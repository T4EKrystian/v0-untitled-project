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
          // Znajdź webinar z otwartymi rejestracjami
          let selectedWebinar = null

          for (const webinar of webinars) {
            console.log(`Server: Sprawdzanie webinaru ${webinar.webinarId}:`, {
              name: webinar.name,
              status: webinar.status,
              startsOn: webinar.startsOn,
              registrationSettings: webinar.registrationSettings,
            })

            // Sprawdź czy webinar ma otwarte rejestracje
            if (webinar.status === "active" || webinar.status === "draft") {
              selectedWebinar = webinar
              break
            }
          }

          if (selectedWebinar) {
            const webinarId = selectedWebinar.webinarId
            console.log("Server: Używam webinar ID:", webinarId)
            console.log("Server: Webinar details:", {
              name: selectedWebinar.name,
              status: selectedWebinar.status,
              startsOn: selectedWebinar.startsOn,
            })

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
                  webinarName: selectedWebinar.name,
                  registrationId: result.registrationId || result.id,
                },
              })
            } else {
              const errorData = await registrationResponse.text()
              console.error("Server: ❌ Błąd rejestracji GetResponse:", errorData)

              // Spróbuj dodać do listy kontaktów jako fallback
              console.log("Server: Próbuję dodać do listy kontaktów jako fallback...")

              try {
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
                          getResponse: "added_to_list",
                          listId: listId,
                          contactId: contactResult.contactId,
                          webinarError: errorData,
                        },
                      })
                    }
                  }
                }
              } catch (listError) {
                console.error("Server: Błąd dodawania do listy:", listError)
              }

              return NextResponse.json(
                {
                  success: false,
                  message: "Błąd podczas rejestracji na webinar",
                  error: errorData,
                  debug: {
                    getResponse: "registration_failed",
                    webinarId: webinarId,
                    webinarName: selectedWebinar.name,
                    error: errorData,
                  },
                },
                { status: 400 },
              )
            }
          } else {
            console.log("Server: ❌ Brak webinarów z otwartymi rejestracjami")

            // Spróbuj dodać do listy kontaktów
            try {
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
                        getResponse: "added_to_list_no_webinar",
                        listId: listId,
                        contactId: contactResult.contactId,
                      },
                    })
                  }
                }
              }
            } catch (listError) {
              console.error("Server: Błąd dodawania do listy:", listError)
            }

            return NextResponse.json(
              {
                success: false,
                message: "Brak dostępnych webinarów z otwartymi rejestracjami",
                error: "No active webinars with open registration",
                debug: {
                  getResponse: "no_active_webinars",
                  availableWebinars: webinars.map((w) => ({
                    id: w.webinarId,
                    name: w.name,
                    status: w.status,
                  })),
                },
              },
              { status: 404 },
            )
          }
        } else {
          console.log("Server: ❌ Brak webinarów")

          return NextResponse.json(
            {
              success: false,
              message: "Brak dostępnych webinarów",
              error: "No webinars found",
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
