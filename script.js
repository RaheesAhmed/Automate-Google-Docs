function populateTablesFromSheets() {
  var documentId = 'YOUR_DOCUMENT_ID'; // Replace with your Google Docs document ID
  var sheetId = 'YOUR_SHEET_ID'; // Replace with your Google Sheets document ID
  var doc = DocumentApp.openById(documentId);
  var sheet = SpreadsheetApp.openById(sheetId);

  var tabs = sheet.getSheets(); // Get all sheets (tabs) in the spreadsheet
  
  for (var i = 0; i < tabs.length; i++) {
    var tabName = tabs[i].getName();
    var table = doc.getBody().findText("{{" + tabName + "}}").getElement().getParent("TABLE");
    var data = tabs[i].getDataRange().getValues(); // Get all data in the tab
    
    // Clear existing rows in the table
    var rows = table.getNumRows();
    for (var j = rows - 1; j >= 1; j--) {
      table.removeRow(j);
    }

    // Populate the table with data from the sheet
    for (var row = 0; row < data.length; row++) {
      var tableRow = table.appendTableRow();
      for (var col = 0; col < data[row].length; col++) {
        tableRow.appendTableCell(data[row][col]);
      }
    }
  }
}
