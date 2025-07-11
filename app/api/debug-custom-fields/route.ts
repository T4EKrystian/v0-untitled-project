import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const apiKey = "wic2ysqcn4we1qmg9u2e8s67gd1v64c5"

    console.log("=== CUSTOM FIELDS DEBUG ===")

    // Pobierz wszystkie custom fields
    const customFieldsResponse = await fetch("https://api.getresponse.com/v3/custom-fields", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": `api-key ${apiKey}`,
      },
    })

    console.log("Custom fields response status:", customFieldsResponse.status)

    if (customFieldsResponse.ok) {
      const customFields = await customFieldsResponse.json()
      console.log("Found custom fields:", customFields.length)

      const fieldDetails = customFields.map((field: any) => ({
        id: field.customFieldId,
        name: field.name,
        type: field.type,
        fieldType: field.fieldType,
        valueType: field.valueType,
        values: field.values,
        hidden: field.hidden,
        format: field.format,
      }))

      return NextResponse.json({
        success: true,
        customFields: fieldDetails,
        count: customFields.length,
        debug: {
          timestamp: new Date().toISOString(),
        },
      })
    } else {
      const errorText = await customFieldsResponse.text()
      console.error("Custom fields error:", errorText)

      return NextResponse.json(
        {
          success: false,
          error: errorText,
          status: customFieldsResponse.status,
        },
        { status: customFieldsResponse.status },
      )
    }
  } catch (error) {
    console.error("Debug custom fields error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    )
  }
}
