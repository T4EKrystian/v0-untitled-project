import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const apiKey = "wic2ysqcn4we1qmg9u2e8s67gd1v64c5"

    console.log("=== WEBINARS DEBUG ===")

    // Pobierz wszystkie webinary
    const webinarsResponse = await fetch("https://api.getresponse.com/v3/webinars", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `api-key ${apiKey}`,
      },
    })

    console.log("Webinars response status:", webinarsResponse.status)

    if (webinarsResponse.ok) {
      const webinars = await webinarsResponse.json()
      console.log("Found webinars:", webinars.length)

      const webinarDetails = webinars.map((webinar: any) => ({
        id: webinar.webinarId,
        name: webinar.name,
        status: webinar.status,
        registrationEnabled: webinar.registrationEnabled,
        startsOn: webinar.startsOn,
        createdOn: webinar.createdOn,
        description: webinar.description,
      }))

      return NextResponse.json({
        success: true,
        webinars: webinarDetails,
        count: webinars.length,
        debug: {
          timestamp: new Date().toISOString(),
        },
      })
    } else {
      const errorText = await webinarsResponse.text()
      console.error("Webinars error:", errorText)

      return NextResponse.json(
        {
          success: false,
          error: errorText,
          status: webinarsResponse.status,
        },
        { status: webinarsResponse.status },
      )
    }
  } catch (error) {
    console.error("Debug webinars error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
