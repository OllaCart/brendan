document.addEventListener('DOMContentLoaded', function() {
    const tableContainer = document.getElementById('table-container');
    const loanProgramSelect = document.getElementById('loanProgram');
    const calculateButton = document.getElementById('calculateButton');

    const loanPrograms = [
        'Conventional', 'FHA', 'VA', 'USDA', 'Jumbo', 'Fix and Flip', 'DSCR', 'Adjustable-Rate', 'Commercial',
    ]; // Add new loan programs here

    const tableHeaders = ['Items', ...loanPrograms];
    const tableRows = [
        'Purchase Price',
        'Interest Rate',
        'Loan Term',
        'Monthly Payment (PITI)',
        'Monthly Principal and Interest',
        'Mortgage Insurance',
        'Monthly Property Taxes',
        'Monthly Homeowners Insurance',
        'Estimated Escrow',
        'Monthly HOA/Condo Fees',
        'Prepayment Penalty',
        'Balloon Payment',
        'Loan Term',
        'Estimated Closing Costs',
        'Estimated Cash to Close',
        'Credit Report Fee',
        'Processing Fee',
        'Underwriting Fee',
        'Application Fee',
        'Appraisal Fee',
        'Property Income Report Fee',
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
        'Prepaid Property Taxes (6 Months)',
        'Prepaid Homeowners Insurance (3 months)',
        'Prepaid Mortgage Insurance (0 Months)',
        'Home Inspection Fee',
        'Pest Inspection Fee',
        'Unbeatable Earnest Deposit',
        '(Optional) Owners Title Insurance',
        'Total Discretionary, Initial Escrow, Prepaid, and Government Fees',
        'Subtotal Closing Costs',
        'Lender Credits',
        'Closing Costs Subtotals',
        'Down Payment',
        'Cash to Close - Without Unbeatable',
        'Cash to Close - Unbeatable Offer'
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
        const purchasePrice = parseFloat(document.getElementById('downPayment').value);
        const zipCode = parseFloat(document.getElementById('zipCode').value);
        const creditScore = parseFloat(document.getElementById('creditScore').value);
        const associationFees = parseFloat(document.getElementById('associationFees').value);
        const agentCommission =parseFloat(document.getElementById('agentCommission').value);
        const taxFactor = calculateTaxFactor(zipCode);
        const transferTaxFactor = calculateTransferTaxFactor(zipCode);

        // Call calculation functions and update table cells
        calculateAndUpdateTable(selectedProgram, downPaymentpurchasePrice, zipCode, creditScore, associationFees, agentCommission, taxFactor, transferTaxFactor);
    });
});
function calculateTransferTaxFactor(zipcode) {
    let transferTaxFactor = 1; // Default tax factor

    if (zipcode >= 35000 && zipcode <= 36999) {
        transferTaxFactor = 0.001; // Alabama
    } else if (zipcode >= 99500 && zipcode <= 99999) {
        transferTaxFactor = 0; // Alaska
    } else if (zipcode >= 85000 && zipcode <= 86999) {
        transferTaxFactor = 0.004; // Arizona
    } else if (zipcode >= 71600 && zipcode <= 72999) {
        transferTaxFactor = 0.0033; // Arkansas
    } else if (zipcode >= 90000 && zipcode <= 96699) {
        transferTaxFactor = 0.007; // California
    } else if (zipcode >= 80000 && zipcode <= 81999) {
        transferTaxFactor = 0.002; // Colorado
    } else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
        transferTaxFactor = 0.00635; // Connecticut
    } else if (zipcode >= 19700 && zipcode <= 19999) {
        transferTaxFactor = 0.00425; // Delaware
    } else if (zipcode >= 32000 && zipcode <= 34999) {
        transferTaxFactor = 0.007; // Florida
    } else if ((zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999)) {
        transferTaxFactor = 0.001; // Georgia
    } else if (zipcode >= 96700 && zipcode <= 96999) {
        transferTaxFactor = 0.0017; // Hawaii
    } else if (zipcode >= 83200 && zipcode <= 83999 && zipcode != 83414) {
        transferTaxFactor = 0.002; // Idaho
    } else if (zipcode >= 60000 && zipcode <= 62999) {
        transferTaxFactor = 0.0025; // Illinois
    } else if (zipcode >= 46000 && zipcode <= 47999) {
        transferTaxFactor = 0.002; // Indiana
    } else if (zipcode >= 50000 && zipcode <= 52999) {
        transferTaxFactor = 0.00185; // Iowa
    } else if (zipcode >= 66000 && zipcode <= 67999) {
        transferTaxFactor = 0.00333; // Kansas
    } else if (zipcode >= 40000 && zipcode <= 42999) {
        transferTaxFactor = 0.00145; // Kentucky
    } else if (zipcode >= 70000 && zipcode <= 71599) {
        transferTaxFactor = 0.005; // Louisiana
    } else if (zipcode >= 3900 && zipcode <= 4999) {
        transferTaxFactor = 0.014; // Maine
    } else if (zipcode >= 20600 && zipcode <= 21999) {
        transferTaxFactor = 0.011; // Maryland
    } else if (zipcode >= 1000 && zipcode <= 2799) {
        transferTaxFactor = 0.0023; // Massachusetts
    } else if (zipcode >= 48000 && zipcode <= 49999) {
        transferTaxFactor = 0.006; // Michigan
    } else if (zipcode >= 55000 && zipcode <= 56899) {
        transferTaxFactor = 0.0034; // Minnesota
    } else if (zipcode >= 38600 && zipcode <= 39999) {
        transferTaxFactor = 0.003; // Mississippi
    } else if (zipcode >= 63000 && zipcode <= 65999) {
        transferTaxFactor = 0.00133; // Missouri
    } else if (zipcode >= 59000 && zipcode <= 59999) {
        transferTaxFactor = 0.007; // Montana
    } else if (zipcode >= 27000 && zipcode <= 28999) {
        transferTaxFactor = 0.002; // North Carolina
    } else if (zipcode >= 58000 && zipcode <= 58999) {
        transferTaxFactor = 0.002; // North Dakota
    } else if (zipcode >= 68000 && zipcode <= 69999) {
        transferTaxFactor = 0.0025; // Nebraska
    } else if (zipcode >= 88900 && zipcode <= 89999) {
        transferTaxFactor = 0.0071; // Nevada
    } else if (zipcode >= 3000 && zipcode <= 3899) {
        transferTaxFactor = 0.014; // New Hampshire
    } else if (zipcode >= 7000 && zipcode <= 8999) {
        transferTaxFactor = 0.0045; // New Jersey
    } else if (zipcode >= 87000 && zipcode <= 88499) {
        transferTaxFactor = 0.011; // New Mexico
    } else if ((zipcode >= 10000 && zipcode <= 14999) || zipcode == 6390 || zipcode == 501 || zipcode == 544) {
        transferTaxFactor = 0.0043; // New York
    } else if (zipcode >= 43000 && zipcode <= 45999) {
        transferTaxFactor = 0.00195; // Ohio
    } else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999)) {
        transferTaxFactor = 0.003; // Oklahoma
    } else if (zipcode >= 97000 && zipcode <= 97999) {
        transferTaxFactor = 0.0115; // Oregon
    } else if (zipcode >= 15000 && zipcode <= 19699) {
        transferTaxFactor = 0.01; // Pennsylvania
    } else if (zipcode >= 300 && zipcode <= 999) {
        transferTaxFactor = 0.0057; // Puerto Rico
    } else if (zipcode >= 2800 && zipcode <= 2999) {
        transferTaxFactor = 0.0042; // Rhode Island
    } else if (zipcode >= 29000 && zipcode <= 29999) {
        transferTaxFactor = 0.00325; // South Carolina
    } else if (zipcode >= 57000 && zipcode <= 57999) {
        transferTaxFactor = 0.002; // South Dakota
    } else if (zipcode >= 37000 && zipcode <= 38599) {
        transferTaxFactor = 0.0375; // Tennessee
    } else if ((zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) || (zipcode >= 88500 && zipcode <= 88599)) {
        transferTaxFactor = 0.015; // Texas
    } else if (zipcode >= 84000 && zipcode <= 84999) {
        transferTaxFactor = 0.00765; // Utah
    } else if (zipcode >= 5000 && zipcode <= 5999) {
        transferTaxFactor = 0.01; // Vermont
    } else if ((zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || zipcode == 20598) {
        transferTaxFactor = 0.01; // Virginia
    } else if ((zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999)) {
        transferTaxFactor = 0.00456; // Washington DC
    } else if (zipcode >= 98000 && zipcode <= 99499) {
        transferTaxFactor = 0.01; // Washington
    } else if (zipcode >= 24700 && zipcode <= 26999) {
        transferTaxFactor = 0.00655; // West Virginia
    } else if (zipcode >= 53000 && zipcode <= 54999) {
        transferTaxFactor = 0.003; // Wisconsin
    } else if ((zipcode >= 82000 && zipcode <= 83199) || zipcode == 83414) {
        transferTaxFactor = 0.01; // Wyoming
    } else {
        transferTaxFactor = 1;
    }
    return transferTaxFactor;
}
function calculateTaxFactor(zipcode) {
let taxFactor = 1; // Default tax factor

if (zipcode >= 35000 && zipcode <= 36999) {
  taxFactor = 0.41;
} else if (zipcode >= 99500 && zipcode <= 99999) {
  taxFactor = 1.19;
} else if (zipcode >= 85000 && zipcode <= 86999) {
  taxFactor = .64;
} else if (zipcode >= 71600 && zipcode <= 72999) {
  taxFactor = .63;
} else if (zipcode >= 90000 && zipcode <= 96699) {
  taxFactor = .75;
} else if (zipcode >= 80000 && zipcode <= 81999) {
  taxFactor = .54;
} else if ((zipcode >= 6000 && zipcode <= 6389) || (zipcode >= 6391 && zipcode <= 6999)) {
  taxFactor = 1.63;
} else if (zipcode >= 19700 && zipcode <= 19999) {
  taxFactor = .53;
} else if (zipcode >= 32000 && zipcode <= 34999) {
  taxFactor = .89;
} else if ( (zipcode >= 30000 && zipcode <= 31999) || (zipcode >= 39800 && zipcode <= 39999) ) {
  taxFactor = .91
} else if (zipcode >= 96700 && zipcode <= 96999) {
  taxFactor = .29;
} else if (zipcode >= 83200 && zipcode <= 83999 && zipcode != 83414) {
  taxFactor = .76;
} else if (zipcode >= 60000 && zipcode <= 62999) {
  taxFactor = 2.3;
} else if (zipcode >= 46000 && zipcode <= 47999) {
  taxFactor = .87;
} else if (zipcode >= 50000 && zipcode <= 52999) {
  taxFactor = 1.53;
} else if (zipcode >= 66000 && zipcode <= 67999) {
  taxFactor = 1.4;
} else if (zipcode >= 40000 && zipcode <= 42999) {
  taxFactor = .84;
} else if (zipcode >= 70000 && zipcode <= 71599) {
  taxFactor = .51;
} else if (zipcode >= 3900 && zipcode <= 4999) {
  taxFactor = 1.3;
} else if (zipcode >= 20600 && zipcode <= 21999) {
  taxFactor = 1.0;
} else if ( (zipcode >= 1000 && zipcode <= 2799) || (zipcode == 5501) || (zipcode == 5544 ) ) {
  taxFactor = 1.16;
} else if (zipcode >= 48000 && zipcode <= 49999) {
  taxFactor = 1.53;
} else if (zipcode >= 55000 && zipcode <= 56899) {
  taxFactor = 1.05;
} else if (zipcode >= 38600 && zipcode <= 39999) {
  taxFactor = .62;
} else if (zipcode >= 63000 && zipcode <= 65999) {
  taxFactor = 1.02;
} else if (zipcode >= 59000 && zipcode <= 59999) {
  taxFactor = .68;
} else if (zipcode >= 27000 && zipcode <= 28999) {
  taxFactor = .86;
} else if (zipcode >= 58000 && zipcode <= 58999) {
  taxFactor = 1.01;
} else if (zipcode >= 68000 && zipcode <= 69999) {
  taxFactor = 1.77;
} else if (zipcode >= 88900 && zipcode <= 89999) {
  taxFactor = .7;
} else if (zipcode >= 3000 && zipcode <= 3899) {
  taxFactor = 2.20;
} else if (zipcode >= 7000 && zipcode <= 8999) {
  taxFactor = 2.44;
} else if (zipcode >= 87000 && zipcode <= 88499) {
  taxFactor = .67;
} else if ( (zipcode >= 10000 && zipcode <= 14999) || (zipcode == 6390) || (zipcode == 501) || (zipcode == 544) ) {
  taxFactor = 1.58;
} else if (zipcode >= 43000 && zipcode <= 45999) {
  taxFactor = 1.57;
} else if ((zipcode >= 73000 && zipcode <= 73199) || (zipcode >= 73400 && zipcode <= 74999) ) {
  taxFactor = .88;
} else if (zipcode >= 97000 && zipcode <= 97999) {
  taxFactor = 1.07;
} else if (zipcode >= 15000 && zipcode <= 19699) {
  taxFactor = 1.55;
} else if (zipcode >= 300 && zipcode <= 999) {
  taxFactor = .6;
} else if (zipcode >= 2800 && zipcode <= 2999) {
  taxFactor = 1.53;
} else if (zipcode >= 29000 && zipcode <= 29999) {
  taxFactor = .57;
} else if (zipcode >= 57000 && zipcode <= 57999) {
  taxFactor = 1.22;
} else if (zipcode >= 37000 && zipcode <= 38599) {
  taxFactor = .74;
} else if ( (zipcode >= 75000 && zipcode <= 79999) || (zipcode >= 73301 && zipcode <= 73399) ||  (zipcode >= 88500 && zipcode <= 88599) ) {
  taxFactor = 1.81;
} else if (zipcode >= 84000 && zipcode <= 84999) {
  taxFactor = .63;
} else if (zipcode >= 5000 && zipcode <= 5999) {
  taxFactor = 1.78;
} else if ( (zipcode >= 20100 && zipcode <= 20199) || (zipcode >= 22000 && zipcode <= 24699) || (zipcode == 20598) ) {
  taxFactor = .8;
} else if ( (zipcode >= 20000 && zipcode <= 20099) || (zipcode >= 20200 && zipcode <= 20599) || (zipcode >= 56900 && zipcode <= 56999) ) {
  taxFactor = .85;
} else if (zipcode >= 98000 && zipcode <= 99499) {
  taxFactor = 1.06;
} else if (zipcode >= 24700 && zipcode <= 26999) {
  taxFactor = .59;
} else if (zipcode >= 53000 && zipcode <= 54999) {
  taxFactor = 1.68;
} else if ( (zipcode >= 82000 && zipcode <= 83199) || zipcode == 83414 ) {
  taxFactor = .61;
} else {
  taxFactor = 1;
}
return taxFactor;
}

function calculateAndUpdateTable(program, downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
    const calculations = calculateFees(program, downPayment, creditScore);


    Object.keys(calculations).forEach(item => {
        const cellId = `${program}-${item}`;
        const cell = document.getElementById(cellId);
        if (cell) {
            cell.textContent = calculations[item];
        }
    });
}

function calculateFees(program, downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
    // Define fee calculations for each loan program
    const feeCalculators = {
        'conventional': calculateConventionalFees,
        'fha': calculateFhaFees,
        'va': calculateVaFees,
        'usda': calculateUsdaFees,
        'jumbo': calculateJumboFees,
        'fix and flip': calculateFixAndFlipFees,
        'dscr': calculateDSCRFees,
        'adjustable-rate': calculateAdjustableRateFees,
        'commercial': calculateCommercialFees,
        // Add more calculators for other programs
    };

    return feeCalculators[program] ? feeCalculators[program](downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) : {};
}

function calculateConventionalFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission, transferTaxFactor) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const rentalIncomeReportFee = 950;
  const recordingTitle = 75;
  const recordingMortgage = 75;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
//below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
//below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (2000 - downPayment * 10).toFixed(2),
        'mortgage-insurance': pmi,
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}

function calculateFhaFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const recordingTitle = 75;
  const recordingMortgage = 75;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
//below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
//below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (1800 - downPayment * 8).toFixed(2),
        'fha-upfront-mip-premium': (1500).toFixed(2),
        'mortgage-insurance': (200 + downPayment * 1.5).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}

function calculateUsdaFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const recordingTitle = 75;
  const recordingMortgage = 75;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
//below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
//below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (1850 - downPayment * 9).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}

function calculateJumboFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const recordingTitle = 75;
  const recordingMortgage = 75;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
//below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
//below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (1900 - downPayment * 9).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}

function calculateAdjustableRateFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const recordingTitle = 75;
  const recordingMortgage = 75;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
//below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
//below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (1900 - downPayment * 9).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}
function calculateFixAndFlipFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const recordingTitle = 75;
  const recordingMortgage = 75;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
//below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
//below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (1900 - downPayment * 9).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}

function calculateDSCRFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const propertyIncomeReportFee = 950;
  const recordingTitle = 75;
  const recordingMortgage = 75;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
  //below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
  //below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (1900 - downPayment * 9).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}

function calculateCommercialFees(downPayment, purchasePrice, zipCode, creditScore, associationFees, agentCommission) {
  const countyRecordingFees = 250;
  const stateRecordingFees = 150;
  const titleTitleSearchBase = 250;
  const recordingDeedBase = 75;
  const appraisalFeeBase = 550;
  const underwritingFee = 995;
  const applicationFeeBase = 695;
  const commercialIncomeReportFee = 950;
  const recordingTitle = 175;
  const recordingMortgage = 175;
  const surveyFee = 250;
  const pestInspectionFee = 145;
  const floodMonitoringFee = 25;
  const floodDeterminationFee = 35;
  const creditReportFeeBase = 75;
  const processingFeeBase = 395;
  const titleSettlementAgentFee = 350;
  const earnestMoneyDeposit = 1000;
  const insuranceBinder = 150;
  const lenderCredits = 0;
  const initialEscrowMortgageInsurance = 0;
  const prepaidsPropertyTaxes = -100;
//below are dependent calcs
  const monthlyMortgageInsurancePremiumBase =  (purchasePrice * 0.0075) / 12; //State, Credit
  const optionalOwnersTitleInsuranceBase = (purchasePrice * 0.00575).toFixed(2); //State, Credit
  const recordingTransferTaxBase = (purchasePrice * 0.01).toFixed(2);; //State
  const monthlyprivateMortgageInsuranceBase = ((purchasePrice * 0.0075)/12).toFixed(2);//State, Credit
  const monthlyHomeownersInsuranceBase = ((purchasePrice * 0.0103) / 12).toFixed(2);
  const monthlyHomeownersInsurance = ((purchasePrice * 0.01035) / 12).toFixed(2);;
  const monthlyPropertyTaxes = parseFloat((annualPropertyTax) / 12);
  const prepaidsHomeownersInsurance = (purchasePrice * 0.01035).toFixed(2);
  const titleLendersTitleInsuranceBase =  (purchasePrice * 0.0065).toFixed(2);
  const upfrontMortgageInsurancePremiumBase = (loanAmount * 0.0175).toFixed(2);
  const homeInspectionFeeBase =  (purchasePrice * 0.0035).toFixed(2);
  const initialEscrowTaxes= (monthlyPropertyTaxes * 6).toFixed(2);//
  const initialEscrowHOI = (((purchasePrice * .01) / 12) * 3).toFixed(2);
  const estimatedEscrow = ((purchasePrice * 0.0103) / 12) + parseFloat(monthlyPropertyTaxes);
//below here are determined calcs
  const dailyInterestRate = interestRate / 365 / 100; // Convert annual rate to daily decimal
  const prepaidInterest = (loanAmount * dailyInterestRate * 15).toFixed(2); // Return the result rounded to 2 decimal places
  const monthlyInterestRate = interestRate / 12 / 100; // Convert annual rate to monthly decimal
  const principalAndInterest = (loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1)).toFixed(2);
  const piti = parseFloat(principalAndInterest) + parseFloat(estimatedEscrow);
  const transferTaxes = purchasePrice * transferTaxFactor;
  const cleanPayment = piti.toFixed(2);
  const otherCosts = parseFloat(optionalOwnersTitleInsuranceBase) + parseFloat(pestInspectionFee) + parseFloat(initialEscrowTaxes) + parseFloat(prepaidsPropertyTaxes) + parseFloat(prepaidInterest) + parseFloat(prepaidsHomeownersInsurance) + parseFloat(stateRecordingFees) + parseFloat(countyRecordingFees) + parseFloat(recordingMortgage) + parseFloat(recordingTitle) + parseFloat(recordingDeedBase) + parseFloat(transferTaxes);
  const costTotals = parseFloat(insuranceBinder) + parseFloat(titleTitleSearchBase) + parseFloat(titleLendersTitleInsuranceBase) + parseFloat(surveyFee) + parseFloat(titleSettlementAgentFee) + parseFloat(floodDeterminationFee) + parseFloat(floodMonitoringFee) + parseFloat(creditReportFeeBase) + parseFloat(appraisalFeeBase) + parseFloat(applicationFeeBase) + parseFloat(underwritingFee) + parseFloat(processingFeeBase) + parseFloat(creditReportFeeBase);
  const closingCosts = parseFloat(otherCosts) + parseFloat(costTotals);
  const cashToClose = parseFloat(closingCosts) + parseFloat(downPayment) + parseFloat(earnestMoneyDeposit);
  const unbeatableCredit = parseFloat(purchasePrice) * commission;//this is where we put the buyers agent commission
  const unbeatableDeal = parseFloat(cashToClose) - parseFloat(unbeatableCredit);
    return {
        'monthly-principal-and-interest': (1900 - downPayment * 9).toFixed(2),
        'monthly-property-taxes': (300 + downPayment * 0.5).toFixed(2),
        'monthly-homeowners-insurance': (100 + downPayment * 0.3).toFixed(2),
        // Add other fees
    };
}
