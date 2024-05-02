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

let postcodes = []

function fetchJSONFile(filename, callback) {
    fetch(filename)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error('There was a problem fetching the JSON file:', error);
        });
}

function isValidPostalCode(postcode) { // Checks for regex matching in Canada postcode
    // Reference https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
    var postalCodePattern = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
    return postalCodePattern.test(postcode)
}

document.getElementById("postcodeForm").addEventListener("submit", function(event) {
    var postcode = document.getElementById("postcode").value;
    if(postcodes.includes(postcode)) {
        event.preventDefault();
        sessionStorage.setItem('postcode', postcode)
        window.location.href = "checkout.html"
    } 
    else if(postcode.length != 7) {
        alert("INVALID POSTCODE");
        event.preventDefault();
        window.location.href = "invalidPostCode.html"
    }
    else if(!isValidPostalCode(postcode)) {
        alert("ILLEGAL POSTCODE")
        event.preventDefault();
        window.location.href = "illegalPostCode.html"
    }
    else {
        alert("UNAVAILABLE POSTCODE")
        event.preventDefault();
        window.location.href = "serviceNA.html"
    }
})

document.addEventListener('DOMContentLoaded', function() {
    let jsonFilename = '../data/Postcode1.json'; // Replace 'your_json_file.json' with the actual filename

    // Call fetchJSONFile function to fetch the JSON file
    fetchJSONFile(jsonFilename, function(data) {
        // Extract postcode values from the data and store them in the array
        data.forEach(item => {
            postcodes.push(item["Postal Code"].trim());
        });

        // You can now use the 'postcodes' array for further processing
        console.log('Postcodes:', postcodes);
    });
    jsonFilename = '../data/Postcode2.json';
    fetchJSONFile(jsonFilename, function(data) {
        // Extract postcode values from the data and store them in the array
        data.forEach(item => {
            postcodes.push(item["Postal Code"].trim());
        });

        // You can now use the 'postcodes' array for further processing
        console.log('Postcodes:', postcodes);
    });
});