function goToStep2() {
    document.getElementById('form-step-1').style.display = 'none';
    document.getElementById('form-step-2').style.display = 'block';
}

function showInfo(id) {
    const infoElement = document.getElementById(id);
    if (infoElement.style.display === 'none' || infoElement.style.display === '') {
        infoElement.style.display = 'block';
    } else {
        infoElement.style.display = 'none';
    }
}

function calculateTax() {
    const age = parseInt(document.getElementById('age').value) || 0;
    const income = parseFloat(document.getElementById('income').value) || 0;

    const deduction80C = parseFloat(document.getElementById('deduction-80c').value) || 0;
    const deduction80D = parseFloat(document.getElementById('deduction-80d').value) || 0;
    const deduction80G = parseFloat(document.getElementById('deduction-80g').value) || 0;
    const deduction80CCD = parseFloat(document.getElementById('deduction-80ccd').value) || 0;
    const deduction80TTA = parseFloat(document.getElementById('deduction-80tta').value) || 0;
    const deduction80E = parseFloat(document.getElementById('deduction-80e').value) || 0;
    const deduction80GG = parseFloat(document.getElementById('deduction-80gg').value) || 0;
    const deduction87A = parseFloat(document.getElementById('deduction-87a').value) || 0;

    const totalDeductions = deduction80C + deduction80D + deduction80G + deduction80CCD + deduction80TTA + deduction80E + deduction80GG + deduction87A;
    const taxableIncome = income - totalDeductions;

    const oldRegimeTax = calculateOldRegimeTax(age, taxableIncome);
    const newRegimeTax = calculateNewRegimeTax(taxableIncome);



    document.getElementById('form-step-2').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    conc(oldRegimeTax, newRegimeTax);
}

function conc(oldRegimeTax, newRegimeTax) {
    let conclusion = `Old Regime Tax: ₹${oldRegimeTax}\n\nNew Regime Tax: ₹${newRegimeTax}\n\n`;
    if (newRegimeTax > oldRegimeTax) {
        conclusion += "Old regime is better.";
    } else {
        conclusion += "New regime is better ";
    }
    document.getElementById("conclusion").innerText = conclusion;
}

function calculateOldRegimeTax(age, income) {
    let tax = 0;

    if (age < 60) {
        if (income <= 250000) {
            tax = 0;
        } else if (income <= 500000) {
            tax = (income - 250000) * 0.05;
        } else if (income <= 1000000) {
            tax = (250000 * 0.05) + ((income - 500000) * 0.2);
        } else {
            tax = (250000 * 0.05) + (500000 * 0.2) + ((income - 1000000) * 0.3);
        }
    } else if (age < 80) {
        if (income <= 300000) {
            tax = 0;
        } else if (income <= 500000) {
            tax = (income - 300000) * 0.05;
        } else if (income <= 1000000) {
            tax = (200000 * 0.05) + ((income - 500000) * 0.2);
        } else {
            tax = (200000 * 0.05) + (500000 * 0.2) + ((income - 1000000) * 0.3);
        }
    } else {
        if (income <= 500000) {
            tax = 0;
        } else if (income <= 1000000) {
            tax = (income - 500000) * 0.2;
        } else {
            tax = (500000 * 0.2) + ((income - 1000000) * 0.3);
        }
    }

    return tax;
}

function calculateNewRegimeTax(income) {
    let tax = 0;

    if (income <= 250000) {
        tax = 0;
    } else if (income <= 500000) {
        tax = (income - 250000) * 0.05;
    } else if (income <= 750000) {
        tax = (250000 * 0.05) + ((income - 500000) * 0.1);
    } else if (income <= 1000000) {
        tax = (250000 * 0.05) + (250000 * 0.1) + ((income - 750000) * 0.15);
    } else if (income <= 1250000) {
        tax = (250000 * 0.05) + (250000 * 0.1) + (250000 * 0.15) + ((income - 1000000) * 0.2);
    } else if (income <= 1500000) {
        tax = (250000 * 0.05) + (250000 * 0.1) + (250000 * 0.15) + (250000 * 0.2) + ((income - 1250000) * 0.25);
    } else {
        tax = (250000 * 0.05) + (250000 * 0.1) + (250000 * 0.15) + (250000 * 0.2) + (250000 * 0.25) + ((income - 1500000) * 0.3);
    }

    return tax;
}
