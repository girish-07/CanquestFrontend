const canadaPostcodes = [
    "A1A 1A1",
    "B2B 2B2",
    "C3C 3C3",
    "H0H 0H0",
    "K1A 0B1",
    "A2A 2A2",  
    "N0N 0A1",  
]

const availablePostcodes = [
    "A1A 1A1",
    "B2B 2B2",
    "C3C 3C3",
    "H0H 0H0",
    "K1A 0B1",
    "N0N 0A1",
];

function isValidPostalCode(postcode) { // Checks for regex matching in Canada postcode
    // Reference https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
    var postalCodePattern = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalCodePattern.test(postcode)
}

document.getElementById("postcodeForm").addEventListener("submit", function(event) {
    var postcode = document.getElementById("postcode").value;
    var serviceProvider = document.getElementById("service-provider").value;
    if(!isValidPostalCode(postcode)) {
        alert("Invalid Postcode");
        event.preventDefault();
        window.location.href = "invalidPostCode.html"
    }
    else if(!canadaPostcodes.includes(postcode)) {
        alert("Invalid Postcode")
        event.preventDefault();
        window.location.href = "illegalPostCode.html"
    }
    else if(!availablePostcodes.includes(postcode)) {
        alert("Invalid Postcode")
        event.preventDefault();
        window.location.href = "serviceNA.html"
    }
    else {
        event.preventDefault();
        sessionStorage.setItem('postcode', postcode)
        sessionStorage.setItem('serviceProvider', serviceProvider)
        if(document.getElementById('buy').checked) {
            sessionStorage.setItem('buy_rent_option', 'buy');
        }
        else {
            sessionStorage.setItem('buy_rent_option', 'rent');
        }
        window.location.href = "checkout.html"
    }
})