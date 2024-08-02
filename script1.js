document.addEventListener('DOMContentLoaded', function() {
    const tableContainer = document.getElementById('table-container');
    const loanProgramSelect = document.getElementById('loanProgram');
    const calculateButton = document.getElementById('calculateButton');

    const loanPrograms = ['Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Fixed-Rate', 'Adjustable-Rate']; // Add new loan programs here
    const tableHeaders = ['Items', ...loanPrograms];
    const tableRows = [
        'Monthly Principal and Interest',
        'Mortgage Insurance',
        'Monthly Property Taxes',
        'Monthly Homeowners Insurance',
        'Estimated Escrow',
        'Monthly HOA/Condo Fees',
        'Loan Amount',
        'Interest Rate',
        'Purchase Price',
        'Monthly Payment (PITI)',
        'Prepayment Penalty',
        'Balloon Payment',
        'Loan Term',
        'Costs at Closing',
        'Estimated Closing Costs',
        'Estimated Cash to Close',
        'Credit Report Fee',
        'Processing Fee',
        'Underwriting Fee',
        'Application Fee',
        'Appraisal Fee',
        'Rental Income Report Fee',
        'Flood Monitoring Fee',
        'Flood Determination Fee',
        'Settlement Agent Fee',
        'Survey Fee',
        'Lenders Title Insurance',
        'Title: Title Search Fee',
        'Title: Recording Mortgage Fee',
        'Title: Insurance Binder',
        'Origination, Services Totals',
        'Title: Recording Deed Fee',
        'Title: Recording Title Fee',
        'County Recording Fees',
        'State Recording Fees',
        'Transfer Taxes',
        'Homeowners Insurance Premium',
        'Conventional Private Mortgage Insurance Premium',
        'FHA Upfront Mortgage Insurance Premium',
        'Prepaid Interest',
        'Prepaid Property Taxes',
        'for Homeowners Insurance (3 months)',
        'for Mortgage Insurance (0 Months)',
        'for Property Taxes (6 months)',
        'Home Inspection Fee',
        'Pest Inspection Fee',
        'Unbeatable Earnest Deposit',
        '(Optional) Owners Title Insurance',
        'Total Discretionary, Initial Escrow, Prepaid, and Government Fees',
        'Subtotal Closing Costs',
        'Lender Credits',
        'Closing Costs Subtotals',
        'Down Payment',
        'Cash to Close without Unbeatable',
        'Unbeatable Offer for Cash to Close'
    ];

    // Populate the select dropdown with loan programs
    loanPrograms.forEach(program => {
        const option = document.createElement('option');
        option.value = program.toLowerCase().replace(/\s+/g, '-');
        option.textContent = program;
        loanProgramSelect.appendChild(option);
    });

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    tableHeaders.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    tableRows.forEach(rowText => {
        const tr = document.createElement('tr');
        const tdItem = document.createElement('td');
        tdItem.textContent = rowText;
        tr.appendChild(tdItem);

        loanPrograms.forEach(program => {
            const td = document.createElement('td');
            td.id = `${program.toLowerCase().replace(/\s+/g, '-')}-${rowText.toLowerCase().replace(/\s+/g, '-')}`;
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);

    // Add event listener to the calculate button
    calculateButton.addEventListener('click', function() {
        const selectedProgram = loanProgramSelect.value;
        const downPayment = parseFloat(document.getElementById('downPayment').value);

        // Call calculation functions and update table cells
        calculateAndUpdateTable(selectedProgram, downPayment);
    });
});

function calculateAndUpdateTable(program, downPayment) {
    const calculations = calculateFees(program, downPayment);

    Object.keys(calculations).forEach(item => {
        const cellId = `${program}-${item}`;
        const cell = document.getElementById(cellId);
        if (cell) {
            cell.textContent = calculations[item];
        }
    });
}

function calculateFees(program, downPayment) {
    // Dummy calculation function - Replace with actual calculations
    return {
        'monthly-principal-and-interest': (2000 - downPayment * 10).toFixed(2),
        'mortgage-insurance': (150 + downPayment * 2).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        'estimated-escrow': (350 + downPayment * 0.7).toFixed(2),
        'monthly-hoa-condo-fees': (200 + downPayment * 0.2).toFixed(2),
        'loan-amount': (250000 - downPayment * 1000).toFixed(2),
        'interest-rate': (3.5 + downPayment * 0.05).toFixed(2),
        'purchase-price': (300000 - downPayment * 1500).toFixed(2),
        'monthly-payment-piti': (2500 - downPayment * 12).toFixed(2),
        'prepayment-penalty': (0).toFixed(2),
        'balloon-payment': (0).toFixed(2),
        'loan-term': (30).toFixed(2),
        'costs-at-closing': (5000 - downPayment * 30).toFixed(2),
        'estimated-closing-costs': (6000 - downPayment * 35).toFixed(2),
        'estimated-cash-to-close': (7000 - downPayment * 40).toFixed(2),
        'credit-report-fee': (50).toFixed(2),
        'processing-fee': (400).toFixed(2),
        'underwriting-fee': (500).toFixed(2),
        'application-fee': (200).toFixed(2),
        'appraisal-fee': (300).toFixed(2),
        'rental-income-report-fee': (100).toFixed(2),
        'flood-monitoring-fee': (75).toFixed(2),
        'flood-determination-fee': (85).toFixed(2),
        'settlement-agent-fee': (450).toFixed(2),
        'survey-fee': (350).toFixed(2),
        'lenders-title-insurance': (500).toFixed(2),
        'title-title-search-fee': (100).toFixed(2),
        'title-recording-mortgage-fee': (75).toFixed(2),
        'title-insurance-binder': (50).toFixed(2),
        'origination-services': (1000).toFixed(2),
        'title-recording-deed-fee': (75).toFixed(2),
        'title-recording-title-fee': (75).toFixed(2),
        'county-recording-fees': (100).toFixed(2),
        'state-recording-fees': (150).toFixed(2),
        'transfer-taxes': (200).toFixed(2),
        'homeowners-insurance-premium': (1200).toFixed(2),
        'conventional-pmi-premium': (100).toFixed(2),
        'fha-upfront-mip-premium': (1500).toFixed(2),
        'prepaid-interest': (300).toFixed(2),
        'prepaid-property-taxes': (500).toFixed(2),
        'homeowners-insurance-3-months': (300).toFixed(2),
        'mortgage-insurance-0-months': (0).toFixed(2),
        'property-taxes-6-months': (600).toFixed(2),
        'home-inspection-fee': (300).toFixed(2),
        'pest-inspection-fee': (150).toFixed(2),
        'unbeatable-earnest-deposit': (1000).toFixed(2),
        'optional-owners-title-insurance': (500).toFixed(2),
        'total-discretionary-initial-escrow-prepaid-gov-fees': (2000).toFixed(2),
        'subtotal-closing-costs': (5000).toFixed(2),
        'lender-credits': (-1000).toFixed(2),
        'closing-costs-subtotals': (4000).toFixed(2),
        'down-payment': (30000 - downPayment * 200).toFixed(2),
        'cash-to-close-no-unbeatable': (35000 - downPayment * 250).toFixed(2),
        'unbeatable-offer': (1000).toFixed(2)
    };
}
