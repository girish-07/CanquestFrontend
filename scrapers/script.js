const fs = require('fs');
const xlsx = require('xlsx');

// Load the Excel file
const workbook = xlsx.readFile('../data/Cable Providers in Canada.xlsx');

// Assuming there's only one sheet, you can change the index if there are multiple sheets
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON format
const jsonData = xlsx.utils.sheet_to_json(sheet);

// Convert JSON data to string
const dataString = JSON.stringify(jsonData, null, 2);

// Write the data to a file
fs.writeFile('output.json', dataString, (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('Data has been written to output.json');
});
