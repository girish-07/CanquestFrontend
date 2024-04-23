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