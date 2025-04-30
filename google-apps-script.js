/**
 * Obsługuje żądania POST z formularza webinarowego
 * Ten kod należy wkleić do edytora Google Apps Script w arkuszu Google Sheets
 */
function doPost(e) {
  try {
    // Obsługa CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST",
      "Access-Control-Allow-Headers": "Content-Type",
      "Content-Type": "application/json",
    }

    // Parsowanie danych przychodzących
    const data = JSON.parse(e.postData.contents)

    // Otwieranie aktywnego arkusza
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()

    // Sprawdzenie, czy arkusz ma nagłówki, jeśli nie - dodaj je
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Imię i nazwisko", "Email", "Telefon", "Data zgłoszenia"])
    }

    // Formatowanie daty
    let formattedDate
    try {
      const timestamp = new Date(data.timestamp)
      formattedDate = Utilities.formatDate(timestamp, "Europe/Warsaw", "dd.MM.yyyy HH:mm:ss")
    } catch (e) {
      // Jeśli formatowanie się nie powiedzie, użyj aktualnej daty
      formattedDate = Utilities.formatDate(new Date(), "Europe/Warsaw", "dd.MM.yyyy HH:mm:ss")
    }

    // Dodawanie nowego wiersza z danymi
    sheet.appendRow([data.name || "", data.email || "", data.phone || "", formattedDate])

    // Zwracanie odpowiedzi sukcesu
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Dane zostały zapisane",
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers)
  } catch (error) {
    // Logowanie błędu
    console.error("Błąd w Google Apps Script:", error)

    // Zwracanie odpowiedzi błędu
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        error: error.toString(),
      }),
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
      })
  }
}

/**
 * Obsługuje żądania OPTIONS (preflight) dla CORS
 */
function doOptions(e) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json",
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers)
}
