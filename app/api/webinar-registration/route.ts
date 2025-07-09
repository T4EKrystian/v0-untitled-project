import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone } = body

    const apiKey = "wic2ysqcn4we1qmg9u2e8s67gd1v64c5"
    const webinarId = "VDWKD"

    console.log("Server: Wysyłanie do GetResponse API")

    // Wysyłanie do GetResponse API
    const response = await fetch(`https://api.getresponse.com/v3/webinars/${webinarId}/registrations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `api-key ${apiKey}`,
      },
      body: JSON.stringify({
        email: email,
        name: name,
        customFieldValues: [
          {
            customFieldId: "phone",
            value: [phone],
          },
        ],
      }),
    })

    if (response.ok) {
      const result = await response.json()
      console.log("Server: Pomyślnie wysłano do GetResponse")
      return NextResponse.json({ success: true, data: result })
    } else {
      const errorData = await response.text()
      console.error("Server: Błąd GetResponse API:", errorData)
      return NextResponse.json({ success: false, error: errorData }, { status: 400 })
    }
  } catch (error) {
    console.error("Server: Błąd podczas wysyłania do GetResponse:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
