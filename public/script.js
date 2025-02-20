document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("calculate").addEventListener("click", calculateTax);
});

async function calculateTax() {
  let income = parseFloat(document.getElementById("income").value);
  let resultsDiv = document.getElementById("results");

  if (isNaN(income) || income <= 0) {
    resultsDiv.innerHTML = "Please enter a valid income amount.";
    return;
  }

  try {
    let response = await fetch("/tax_brackets");
    let taxBrackets = await response.json();

    let tax = 0;
    let taxRate = 0;

    for (let bracket of taxBrackets) {
      if (income > bracket.min) {
        let taxableIncome =
          Math.min(income, bracket.max || Infinity) - bracket.min;
        tax += taxableIncome * bracket.rate;
        taxRate = bracket.rate * 100;
      } else {
        break;
      }
    }

    let monthlyTax = tax / 12;
    let afterTaxMonthlyIncome = (income - tax) / 12;

    resultsDiv.innerHTML = `
            <p>Yearly Tax: ZAR ${tax.toFixed(2)}</p>
            <p>Tax Rate: ${taxRate.toFixed(2)}%</p>
            <p>Monthly Tax: ZAR ${monthlyTax.toFixed(2)}</p>
            <p>After-tax Monthly Income: ZAR ${afterTaxMonthlyIncome.toFixed(
              2
            )}</p>
        `;
  } catch (error) {
    console.error("Error loading tax data:", error);
    resultsDiv.innerHTML = "Error loading tax data.";
  }
}
