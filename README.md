# Automate-Google-Docs
Here's a step-by-step guide to get you started:

# Step 1: Set Up Google Sheets

Create a Google Sheets document with your data in multiple tabs.
Make sure that the tab (sheet) names are standardized and consistent.

# Step 2: Set Up Google Documents

Create a Google Docs document where you want to populate the tables.

# Step 3: Create a Google Apps Script

Open the Google Docs document.
Click on "Extensions" in the top menu, then select "Apps Script."
Replace the default code in the Apps Script editor with the following code:

```
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



```

# Step 4: Replace Placeholder in Google Docs

In your Google Docs document, insert a table in each tab where you want the data to be populated.
In the first cell of each table, write the placeholder text like {{Sheet1}}, {{Sheet2}}, etc. This is where the script will identify the tables to populate.

# Step 5: Run the Script

Save the script.
Click the play button (►) to run the script. It will populate the tables in your Google Docs document with data from the corresponding sheets in your Google Sheets document.
Remember to replace 'YOUR_DOCUMENT_ID' and 'YOUR_SHEET_ID' with the actual IDs of your Google Docs and Google Sheets documents.

Please note that Google Apps Script might require certain permissions to access your Google Docs and Sheets. You might need to go through an authorization process when you run the script for the first time.

