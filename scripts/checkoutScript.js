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
    let jsonFilenamePostcode = '../data/Postcode1.json'; // Example JSON file name
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
                    let plansList = document.getElementById('plansTable');
                    let tabCellHeading = document.createElement('th');
                    let serviceProviderHeading = document.createElement('th');
                    let rowHeading = document.createElement('tr');
                    let speedHeading = document.createElement('th');
                    let radioButtonHeading = document.createElement('th');
                    radioButtonHeading.textContent = "  ";
                    tabCellHeading.textContent = "  ";
                    speedHeading.textContent = "SPEED";
                    serviceProviderHeading.textContent = "INTERNET PROVIDER";
                    rowHeading.append(radioButtonHeading);
                    rowHeading.append(tabCellHeading);
                    rowHeading.append(serviceProviderHeading);
                    rowHeading.append(tabCellHeading);
                    rowHeading.append(speedHeading);
                    rowHeading.append(tabCellHeading);
                    let costHeading = document.createElement('th');
                    costHeading.textContent = "COST";
                    rowHeading.append(costHeading);
                    plansList.appendChild(rowHeading);
                    let counter=0;
                    plans.forEach(plan => {
                        if(counter<5) {
                            const listItem = document.createElement('li');
                            let row = document.createElement('tr');
                            let speedCell = document.createElement('td');
                            let tabCell = document.createElement('td');
                            let costCell = document.createElement('td');
                            let serviceProviderCell = document.createElement('td');
                            let nbspNode = document.createTextNode('\u00A0'); // '\u00A0' represents the non-breaking space character
                            let modemRental = parseFloat(plan["Modem Rental/ Month"].replace('$', ''))
                            let routerRetail = parseFloat(plan["Router Retail"].replace('$', ''))
                            let routerRental = parseFloat(plan["Router Rental"].replace('$', ''))
                            let rentRate = parseInt(plan["Retail"])+parseInt(plan["1x Connect. Cost (New)"])+parseInt(modemRental)+parseInt(routerRental);
                            let buyRate = parseInt(plan["Retail"])+parseInt(plan["1x Connect. Cost (New)"])+parseInt(plan["Modem Cost"])+parseInt(routerRetail);

                            let radioButton = document.createElement('input');
                            radioButton.setAttribute('name', 'planRadioButton');
                            radioButton.setAttribute('type', 'radio');
                            radioButton.setAttribute('value', plan);
                            radioButton.addEventListener('click', function() {
                                if(buyOrRent === "buy") {
                                    sessionStorage.setItem('retailPrice', plan["Retail"]);
                                    sessionStorage.setItem('newConnectionCost', plan["1x Connect. Cost (New)"]);
                                    sessionStorage.setItem('modemCost', plan["Modem Cost"]);
                                    sessionStorage.setItem('routerRetailCost', routerRetail);
                                    sessionStorage.setItem('totalPrice', buyRate)
                                }
                                else {
                                    sessionStorage.setItem('retailPrice', plan["Retail"]);
                                    sessionStorage.setItem('newConnectionCost', plan["1x Connect. Cost (New)"]);
                                    sessionStorage.setItem('modemRentalCost', modemRental);
                                    sessionStorage.setItem('routerRentalCost', routerRental);
                                    sessionStorage.setItem('totalPrice', rentRate);
                                }
                                window.location.href = '../templates/orderConfirmation.html';
                            });
                            speedCell.textContent = plan["Speed"];
                            serviceProviderCell.textContent = plan["Third Party Internet Provider"];

                            if(buyOrRent === "buy") {
                                costCell.textContent = parseInt(buyRate);
                                listItem.textContent = `Speed: ${plan["Speed"]}, Rate: ${buyRate}`;
                            }
                            else {
                                costCell.textContent = parseInt(rentRate);
                                listItem.textContent = `Speed: ${plan["Speed"]}, Rate: ${rentRate}`;
                            }

                            row.append(radioButton);
                            row.append(nbspNode);
                            row.append(nbspNode);
                            row.append(tabCell);
                            row.append(serviceProviderCell);
                            row.append(tabCell);
                            row.append(speedCell);
                            row.append(tabCell);
                            row.append(costCell);
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

    jsonFilenamePostcode = '../data/Postcode2.json';

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
                    let plansList = document.getElementById('plansTable');
                    let tabCellHeading = document.createElement('th');
                    let serviceProviderHeading = document.createElement('th');
                    let rowHeading = document.createElement('tr');
                    let speedHeading = document.createElement('th');
                    let radioButtonHeading = document.createElement('th');
                    radioButtonHeading.textContent = "  ";
                    tabCellHeading.textContent = "  ";
                    speedHeading.textContent = "SPEED";
                    serviceProviderHeading.textContent = "INTERNET PROVIDER";
                    rowHeading.append(radioButtonHeading);
                    rowHeading.append(tabCellHeading);
                    rowHeading.append(serviceProviderHeading);
                    rowHeading.append(tabCellHeading);
                    rowHeading.append(speedHeading);
                    rowHeading.append(tabCellHeading);
                    let costHeading = document.createElement('th');
                    costHeading.textContent = "COST";
                    rowHeading.append(costHeading);
                    plansList.appendChild(rowHeading);
                    let counter=0;
                    plans.forEach(plan => {
                        if(counter<5) {
                            const listItem = document.createElement('li');
                            let row = document.createElement('tr');
                            let speedCell = document.createElement('td');
                            let tabCell = document.createElement('td');
                            let costCell = document.createElement('td');
                            let serviceProviderCell = document.createElement('td');
                            let nbspNode = document.createTextNode('\u00A0'); // '\u00A0' represents the non-breaking space character
                            let modemRental = parseFloat(plan["Modem Rental/ Month"].replace('$', ''))
                            let routerRetail = parseFloat(plan["Router Retail"].replace('$', ''))
                            let routerRental = parseFloat(plan["Router Rental"].replace('$', ''))
                            let rentRate = parseInt(plan["Retail"])+parseInt(plan["1x Connect. Cost (New)"])+parseInt(modemRental)+parseInt(routerRental);
                            let buyRate = parseInt(plan["Retail"])+parseInt(plan["1x Connect. Cost (New)"])+parseInt(plan["Modem Cost"])+parseInt(routerRetail);

                            let radioButton = document.createElement('input');
                            radioButton.setAttribute('name', 'planRadioButton');
                            radioButton.setAttribute('type', 'radio');
                            radioButton.setAttribute('value', plan);
                            radioButton.addEventListener('click', function() {
                                if(buyOrRent === "buy") {
                                    sessionStorage.setItem('retailPrice', plan["Retail"]);
                                    sessionStorage.setItem('newConnectionCost', plan["1x Connect. Cost (New)"]);
                                    sessionStorage.setItem('modemCost', plan["Modem Cost"]);
                                    sessionStorage.setItem('routerRetailCost', routerRetail);
                                    sessionStorage.setItem('totalPrice', buyRate)
                                }
                                else {
                                    sessionStorage.setItem('retailPrice', plan["Retail"]);
                                    sessionStorage.setItem('newConnectionCost', plan["1x Connect. Cost (New)"]);
                                    sessionStorage.setItem('modemRentalCost', modemRental);
                                    sessionStorage.setItem('routerRentalCost', routerRental);
                                    sessionStorage.setItem('totalPrice', rentRate);
                                }
                                window.location.href = '../templates/orderConfirmation.html';
                            });
                            speedCell.textContent = plan["Speed"];
                            serviceProviderCell.textContent = plan["Third Party Internet Provider"];

                            if(buyOrRent === "buy") {
                                costCell.textContent = parseInt(buyRate);
                                listItem.textContent = `Speed: ${plan["Speed"]}, Rate: ${buyRate}`;
                            }
                            else {
                                costCell.textContent = parseInt(rentRate);
                                listItem.textContent = `Speed: ${plan["Speed"]}, Rate: ${rentRate}`;
                            }

                            row.append(radioButton);
                            row.append(nbspNode);
                            row.append(nbspNode);
                            row.append(tabCell);
                            row.append(serviceProviderCell);
                            row.append(tabCell);
                            row.append(speedCell);
                            row.append(tabCell);
                            row.append(costCell);
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
