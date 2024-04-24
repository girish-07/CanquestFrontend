// Define global arrays to store JSON object records
var sheet1Data = [];
var sheet2Data = [];

window.onload = function() {
    fetch('../data/canquest.xlsx')
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
            var data = new Uint8Array(arrayBuffer);
            var workbook = XLSX.read(data, { type: 'array' });

            // Parse each sheet's data and store in separate arrays
            workbook.SheetNames.forEach(function(sheetName, index) {
                var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (index === 0) {
                    sheet1Data = XL_row_object;
                } else if (index === 1) {
                    sheet2Data = XL_row_object;
                }
            });

            // Call a function that requires the parsed data
            processData();
        })
        .catch(error => {
            console.error('Error fetching or parsing the Excel file:', error);
        });
        console.log(sheet1Data)
        console.log(sheet2Data)
};


function isValidPostalCode(postcode) { // Checks for regex matching in Canada postcode
    // Reference https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
    var postalCodePattern = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalCodePattern.test(postcode)
}

document.getElementById("postcodeForm").addEventListener("submit", function(event) {
    var postcode = document.getElementById("postcode").value;
    if(!isValidPostalCode(postcode)) {
        alert("Invalid Postcode");
        event.preventDefault();
    }
})