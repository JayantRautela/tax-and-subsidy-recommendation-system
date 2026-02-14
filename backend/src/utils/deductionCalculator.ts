import taxRules from "../../data/taxRules.json" with { type: "json" };
import { type TaxRule, type UserTaxProfile } from "../types/taxTypes.js";

const rules = taxRules as TaxRule[];

export function calculateDeductions(user: UserTaxProfile): number {

  let totalDeduction = 0;

  rules.forEach((rule) => {

    if (
      rule.eligibleOccupation !== "All" &&
      rule.eligibleOccupation !== user.occupation
    ) {
      return;
    }

    switch (rule.section) {

      case "80C":
        totalDeduction += Math.min(
          user.investment80C || 0,
          rule.maxDeduction
        );
        break;

      case "80D":
        totalDeduction += Math.min(
          user.healthInsurance || 0,
          rule.maxDeduction
        );
        break;

      case "24B":
        totalDeduction += Math.min(
          user.homeLoanInterest || 0,
          rule.maxDeduction
        );
        break;

      case "80E":
        totalDeduction += user.educationLoanInterest || 0;
        break;

      case "80TTA":
        totalDeduction += Math.min(
          user.savingsInterest || 0,
          rule.maxDeduction
        );
        break;
    }

  });

  return totalDeduction;
}
