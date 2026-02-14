import { calculateTax } from "./calculateTax.js";
import { calculateDeductions } from "./deductionCalculator.js";
import { type UserTaxProfile } from "../types/taxTypes.js";

const STANDARD_DEDUCTION = 50000;

export function compareRegimes(user: UserTaxProfile) {

  const nonAgriIncome =
    user.income - (user.agriculturalIncome || 0);

  let oldTaxableIncome = nonAgriIncome;

  if (user.occupation === "Salaried") {
    oldTaxableIncome -= STANDARD_DEDUCTION;
  }

  const deductions = calculateDeductions(user);
  oldTaxableIncome -= deductions;

  oldTaxableIncome = Math.max(oldTaxableIncome, 0);

  let oldTax = calculateTax(oldTaxableIncome, "oldRegime");

  if (oldTaxableIncome <= 500000) {
    oldTax = 0;
  }
  let newTaxableIncome = nonAgriIncome;

  newTaxableIncome = Math.max(newTaxableIncome, 0);

  let newTax = calculateTax(newTaxableIncome, "newRegime");

  if (newTaxableIncome <= 700000) {
    newTax = 0;
  }

  return {
    oldRegime: {
      taxableIncome: oldTaxableIncome,
      tax: oldTax
    },
    newRegime: {
      taxableIncome: newTaxableIncome,
      tax: newTax
    },
    recommendation:
      oldTax < newTax
        ? "Old Regime is better"
        : "New Regime is better"
  };
}
