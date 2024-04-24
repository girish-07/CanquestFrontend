// Function to fetch JSON data from a file
let plans = []

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

// Function to check if a pincode exists in the JSON data
function checkPincode(pincode, jsonData) {
    for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i]["Postal Code"].trim() === pincode.trim()) {
            sessionStorage.setItem('province', jsonData[i]["Province"])
            return true; // Pincode found
        }
    }
    return false; // Pincode not found
}

function fetchSpeedAndRate(province, provider, jsonData) {
    let plansValid = []
    for (let i = 0; i < jsonData.length; i++) {
        console.log(jsonData[i]["Market"])
        if (jsonData[i]["Market"] == province && jsonData[i]["Provider"] == provider) {
            plansValid.push(jsonData[i])
        }
    }
    return plansValid;
}

// Example usage
document.addEventListener('DOMContentLoaded', function() {
    const userPincode = sessionStorage.getItem('postcode'); // Example user pincode
    const jsonFilenamePostcode = '../data/Postcode1.json'; // Example JSON file name
    const jsonFilenameProvider = '../data/Provider.json';
    let pinExists = false;

    fetchJSONFile(jsonFilenamePostcode, function(data) {
        // Check if user's pincode exists in the JSON data
        pinExists = checkPincode(userPincode, data);
        if (pinExists) {
            console.log('User pincode exists in the JSON data.');
            const province = sessionStorage.getItem('province');
            const provider = sessionStorage.getItem('serviceProvider');
            const buyOrRent = sessionStorage.getItem('buy_rent_option');
            let plansValid = []
            fetchJSONFile(jsonFilenameProvider, function(data) {
                plansValid = fetchSpeedAndRate(province, provider, data)
                plans = plansValid
                if (plans.length > 0) {
                    const plansList = document.getElementById('plansTable');
                    let row = document.createElement('tr');
                    let speedHeading = document.createElement('th');
                    speedHeading.textContent = "SPEED";
                    row.append(speedHeading);
                    let costHeading = document.createElement('th');
                    costHeading.textContent = "COST";
                    row.append(costHeading);
                    plansList.appendChild(row);
                    let counter=0;
                    plans.forEach(plan => {
                        if(counter<5) {
                            const listItem = document.createElement('li');
                            let row = document.createElement('tr');
                            let speedCell = document.createElement('td');
                            let costCell = document.createElement('td');
                            let modemRental = parseFloat(plan["Modem Rental/ Month"].replace('$', ''))
                            let routerRetail = parseFloat(plan["Router Retail"].replace('$', ''))
                            let routerRental = parseFloat(plan["Router Rental"].replace('$', ''))
                            let rentRate = plan["Retail"]+plan["1x Connect. Cost (New)"]+modemRental+routerRental
                            let buyRate = plan["Retail"]+plan["1x Connect. Cost (New)"]+plan["Modem Cost"]+routerRetail
                            speedCell.textContent = plan["Speed"]

                            if(buyOrRent === "buy") {
                                costCell.textContent = buyRate;
                                listItem.textContent = `Speed: ${plan["Speed"]}, Rate: ${buyRate}`;
                            }
                            else {
                                costCell.textContent = rentRate
                                listItem.textContent = `Speed: ${plan["Speed"]}, Rate: ${rentRate}`;
                            }

                            row.append(speedCell)
                            row.append(costCell)
                            plansList.appendChild(row);
                            counter++;
                        }
                        else return;
                    });
                }
            })
        } else {
            console.log('User pincode does not exist in the JSON data.');
        }
    });
});
