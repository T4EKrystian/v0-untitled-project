/**
 * Google Apps Script do obsługi formularza webinarowego
 * Zapisuje dane z formularza do arkusza Google Sheets
 */

// Funkcja doPost obsługuje żądania POST z formularza
function doPost(e) {
  try {
    // Pobierz dane z żądania
    const data = JSON.parse(e.postData.contents)

    // Logowanie dla debugowania
    console.log("Otrzymane dane:", data)
    console.log("Źródło żądania:", e.origin || "brak informacji o pochodzeniu")

    // Otwórz arkusz
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Sprawdź, czy arkusz ma nagłówki, jeśli nie - dodaj je
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Imię i nazwisko", "Email", "Telefon", "Data zgłoszenia", "Źródło", "User Agent"])
    }

    // Formatowanie daty
    let formattedDate
    try {
      const timestamp = new Date(data.timestamp || new Date().toISOString())
      formattedDate = Utilities.formatDate(timestamp, "Europe/Warsaw", "dd.MM.yyyy HH:mm:ss")
    } catch (e) {
      formattedDate = Utilities.formatDate(new Date(), "Europe/Warsaw", "dd.MM.yyyy HH:mm:ss")
    }

    // Dodawanie nowego wiersza z danymi
    sheet.appendRow([
      data.name || "",
      data.email || "",
      data.phone || "",
      formattedDate,
      data.source || e.origin || "nieznane",
      e.userAgent || "nieznany",
    ])

    // Skonfiguruj nagłówki CORS - zezwalaj na wszystkie domeny
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    }

    // Zwróć sukces
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Dane zostały zapisane",
        timestamp: new Date().toISOString(),
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers)
  } catch (error) {
    // Logowanie błędu
    console.error("Błąd w Google Apps Script:", error)

    // Skonfiguruj nagłówki CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    }

    // Zwróć błąd
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString(),
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers)
  }
}

// Funkcja doGet obsługuje żądania GET (np. do testowania)
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "API is running",
      timestamp: new Date().toISOString(),
    }),
  ).setMimeType(ContentService.MimeType.JSON)
}

// Funkcja doOptions obsługuje żądania OPTIONS (pre-flight dla CORS)
function doOptions() {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "3600",
    "Content-Type": "application/json",
  }

  return ContentService.createTextOutput("").setMimeType(ContentService.MimeType.JSON).setHeaders(headers)
}
