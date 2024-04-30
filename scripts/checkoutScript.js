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

function fetchSpeedAndRate(jsonData) {
    let plansValid = []
    for (let i = 0; i < jsonData.length; i++) {
        console.log(jsonData[i]["Market"])
        plansValid.push(jsonData[i])

    }
    return plansValid;
}

function sortByMaxSpeed(planA, planB) {
    const maxSpeedA = parseInt(planA["Speed"].split('/')[0]); // Extract max speed from planA
    const maxSpeedB = parseInt(planB["Speed"].split('/')[0]); // Extract max speed from planB

    // Compare the maximum speeds and return the comparison result
    return maxSpeedA - maxSpeedB;
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
            let plansValid = []
            fetchJSONFile(jsonFilenameProvider, function(data) {
                plansValid = fetchSpeedAndRate(data)
                plans = plansValid
                if (plans.length > 0) {
                    let plansList = document.getElementById('plansList');
                    let tabCellHeading = document.createElement('th');
                    let serviceProviderHeading = document.createElement('th');
                    let rowHeading = document.createElement('tr');
                    let speedHeading = document.createElement('th');
                    let radioButtonHeading = document.createElement('th');

                    radioButtonHeading.textContent = "  ";
                    tabCellHeading.textContent = "  ";
                    speedHeading.textContent = "SPEED";
                    serviceProviderHeading.textContent = "INTERNET PROVIDER";
                    // rowHeading.append(radioButtonHeading);
                    // rowHeading.append(tabCellHeading);
                    // rowHeading.append(serviceProviderHeading);
                    // rowHeading.append(tabCellHeading);
                    // rowHeading.append(speedHeading);
                    // rowHeading.append(tabCellHeading);
                    let costHeading = document.createElement('th');
                    costHeading.textContent = "COST";
                    // rowHeading.append(costHeading);
                    // plansList.appendChild(rowHeading);
                    let counter=0;
                    plans.sort(sortByMaxSpeed);
                    plans.forEach(plan => {
                        let modemRental = parseFloat(plan["Modem Rental/ Month"].replace('$', '')) || 0; // If NaN, default to 0
                        let routerRetail = parseFloat(plan["Router Retail"].replace('$', '')) || 0; // If NaN, default to 0
                        let routerRental = parseFloat(plan["Router Rental"].replace('$', '')) || 0; // If NaN, default to 0

                        // ParseInt converts the string to a number. If it cannot parse, it returns NaN.
                        // Using logical OR (||) to default to 0 if the parsing fails.
                        let rentRate = (parseInt(plan["Retail"]) || 0) + (parseInt(plan["1x Connect. Cost (New)"]) || 0) + modemRental + routerRental;
                        // let modemRental = parseFloat(plan["Modem Rental/ Month"].replace('$', ''))
                        // let routerRetail = parseFloat(plan["Router Retail"].replace('$', ''))
                        // let routerRental = parseFloat(plan["Router Rental"].replace('$', ''))
                        // let rentRate = parseInt(plan["Retail"])+parseInt(plan["1x Connect. Cost (New)"])+parseInt(modemRental)+parseInt(routerRental);
                        let buyRate = parseInt(plan["Retail"])+parseInt(plan["1x Connect. Cost (New)"])+parseInt(plan["Modem Cost"])+parseInt(routerRetail);
                        if (counter < 6) {
                            const card = document.createElement('div');
                            card.classList.add('card');
                        
                            const cardBody = document.createElement('div');
                            cardBody.classList.add('card-body');
                        
                            const cardTitle = document.createElement('h5');
                            cardTitle.classList.add('card-title');
                            cardTitle.textContent = `${plan["Third Party Internet Provider"]}`;
                            // cardTitle.textContent = `Speed: ${plan["Speed"]}`;
                        
                            // const serviceProvider = document.createElement('p');
                            // serviceProvider.classList.add('card-text');
                            // serviceProvider.textContent = `${rentRate}`;
                        
                            const cost = document.createElement('p');
                            cost.classList.add('card-text');
                            cost.textContent = `$${rentRate}/Month`;

                            // const maxSpeed = document.createElement('p');
                            // maxSpeed.classList.add('card-text');
                            // maxSpeed.textContent = `${plan["Speed"]}`;

                            const speedValues = plan["Speed"].split('/'); // Split the string into an array

                            const maxSpeed = speedValues[0]; // Maximum speed is the first value
                            const minSpeed = speedValues[1]; // Minimum speed is the second value

                            const speedRange = document.createElement('p');
                            speedRange.classList.add('card-text');

                            // Create container for speed elements
                            const speedContainer = document.createElement('div');
                            speedContainer.classList.add('speed-container');

                            // Create circle for max speed
                            const maxSpeedCircle = document.createElement('span');
                            maxSpeedCircle.classList.add('speed-circle');

                            // Create label for max speed
                            const maxSpeedLabel = document.createElement('span');
                            maxSpeedLabel.textContent = maxSpeed;

                            // Create circle for min speed
                            const minSpeedCircle = document.createElement('span');
                            minSpeedCircle.classList.add('speed-circle');

                            // Create label for min speed
                            const minSpeedLabel = document.createElement('span');
                            minSpeedLabel.textContent = minSpeed;

                            // Append elements to speedContainer
                            speedContainer.appendChild(maxSpeedCircle);
                            speedContainer.appendChild(maxSpeedLabel);
                            speedContainer.appendChild(document.createTextNode('\t\t')); // Add space between circles
                            speedContainer.appendChild(minSpeedCircle);
                            speedContainer.appendChild(minSpeedLabel);

                            // Append speedContainer to speedRange
                            speedRange.appendChild(speedContainer);

                            // Append speedRange to card body
                        
                            // const radioButton = document.createElement('input');
                            // radioButton.setAttribute('name', 'planRadioButton');
                            // radioButton.setAttribute('type', 'radio');
                            // radioButton.setAttribute('value', JSON.stringify(plan));
                            // radioButton.addEventListener('click', function() {
                            //     handleRadioButtonClick(plan);
                            // });

                            const rentModemCheckbox = document.createElement('input');
                            rentModemCheckbox.setAttribute('type', 'checkbox');
                            rentModemCheckbox.setAttribute('id', 'rentModemCheckbox'); // Set id for the checkbox if needed
                            rentModemCheckbox.checked = true;

                            // Create label element for the checkbox
                            const rentModemLabel = document.createElement('label');
                            rentModemLabel.setAttribute('for', 'rentModemCheckbox'); // Set for attribute to associate the label with the checkbox
                            rentModemLabel.textContent = 'Rent Modem'; // Text content for the label

                            // Create container for the checkbox and label
                            const rentModemContainer = document.createElement('div');

                            rentModemContainer.appendChild(rentModemCheckbox);
                            rentModemContainer.appendChild(rentModemLabel);
                        
                            const selectButton = document.createElement('button');
                            selectButton.classList.add('btn', 'btn-primary');
                            selectButton.textContent = 'Select Plan';
                            selectButton.addEventListener('click', function() {
                                handleButtonClick(plan);
                            });

                            const labelValuePairContainer = document.createElement('div');
                            labelValuePairContainer.classList.add('label-value-container');

                            // Create label element for technology
                            const technologyLabel = document.createElement('p');
                            technologyLabel.textContent = 'Technology:';
                            technologyLabel.classList.add('label');

                            // Create value element for technology
                            const technologyValue = document.createElement('p');
                            technologyValue.textContent = 'Cable';
                            technologyValue.classList.add('value');

                            // Append label and value elements to the container
                            labelValuePairContainer.appendChild(technologyLabel);
                            labelValuePairContainer.appendChild(technologyValue);
                        
                            cardBody.appendChild(cardTitle);
                            // cardBody.appendChild(serviceProvider);
                            cardBody.appendChild(cost);
                            cardBody.appendChild(speedRange);
                            cardBody.appendChild(labelValuePairContainer);
                            cardBody.appendChild(rentModemContainer);
                            // cardBody.appendChild(radioButton);
                            // cardBody.appendChild(selectButton);
                        
                            card.appendChild(cardBody);
                        
                            plansList.appendChild(card);
                        
                            counter++;
                        } else {
                            return;
                        }
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
            let plansValid = []
            fetchJSONFile(jsonFilenameProvider, function(data) {
                plansValid = fetchSpeedAndRate(data)
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
