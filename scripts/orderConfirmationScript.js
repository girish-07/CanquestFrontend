document.addEventListener('DOMContentLoaded', function() {

    const headerRow = document.createElement('tr');

    // Create table headers for service provider name and cost
    const retailPriceHeader = document.createElement('th');
    retailPriceHeader.textContent = "Retail Price";
    headerRow.appendChild(retailPriceHeader);

    const newConnectionCostHeader = document.createElement('th');
    newConnectionCostHeader.textContent = "New Connection Cost";
    headerRow.appendChild(newConnectionCostHeader);

    const buyOrRent = sessionStorage.getItem("buy_rent_option");

    if(buyOrRent === 'buy') {
        const modemCostHeader = document.createElement('th');
        modemCostHeader.textContent = "Modem Cost";
        headerRow.appendChild(modemCostHeader);

        const routerRetailCostHeader = document.createElement('th');
        routerRetailCostHeader.textContent = "Router Retail Cost";
        headerRow.appendChild(routerRetailCostHeader);
    }
    else {
        const modemRentalCostHeader = document.createElement('th');
        modemRentalCostHeader.textContent = "Modem Rental Cost";
        headerRow.appendChild(modemRentalCostHeader);

        const routerRentalCostHeader = document.createElement('th');
        routerRentalCostHeader.textContent = "Router Rental Cost";
        headerRow.appendChild(routerRentalCostHeader);
    }

    const totalCostHeader = document.createElement('th');
    totalCostHeader.textContent = "Total Cost";
    headerRow.appendChild(totalCostHeader);

    // Append the header row to the table
    document.getElementById('planDetails').appendChild(headerRow);
    // Retrieve plan details from the session variable

    // Create a table row
    const row = document.createElement('tr');

    // Create table cells for service provider name and cost
    const retailPriceCell = document.createElement('td');
    retailPriceCell.textContent = parseInt(sessionStorage.getItem('retailPrice'));
    row.appendChild(retailPriceCell);

    const newConnectionCostCell = document.createElement('td');
    newConnectionCostCell.textContent = parseInt(sessionStorage.getItem('newConnectionCost'));
    row.appendChild(newConnectionCostCell);

    if(buyOrRent === 'buy') {
        const modemCostCell = document.createElement('td');
        modemCostCell.textContent = parseInt(sessionStorage.getItem('modemCost'));
        row.appendChild(modemCostCell);

        const routerRetailCostCell = document.createElement('td');
        routerRetailCostCell.textContent = parseInt(sessionStorage.getItem('routerRetailCost'));
        row.appendChild(routerRetailCostCell);        
    }
    else {
        const modemRentalCostCell = document.createElement('td');
        modemRentalCostCell.textContent = parseInt(sessionStorage.getItem('modemRentalCost'));
        row.appendChild(modemRentalCostCell);

        const routerRentalCostCell = document.createElement('td');
        routerRentalCostCell.textContent = parseInt(sessionStorage.getItem('routerRentalCost'));
        row.appendChild(routerRentalCostCell);
    }

    const totalCostCell = document.createElement('td');
    totalCostCell.textContent = sessionStorage.getItem('totalPrice');
    row.appendChild(totalCostCell);

    // Append the row to the table
    document.getElementById('planDetails').appendChild(row);
});

document.getElementById('submitButton').addEventListener('click', function() {
    // Redirect to the new page
    window.location.href = '../templates/orderSuccess.html';
});
