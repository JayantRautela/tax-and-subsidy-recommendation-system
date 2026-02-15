import { type Operator } from "../types/schemeTypes.js";

export function evaluateRule(
  userValue: any,
  operator: Operator,
  ruleValue: any
): boolean {

  if (userValue === undefined || userValue === null) {
    return false;
  }

  switch (operator) {

    case "equals":
      return userValue === ruleValue;

    case "lessThanOrEqual":
      return userValue <= ruleValue;

    case "greaterThanOrEqual":
      return userValue >= ruleValue;

    case "lessThan":
      return userValue < ruleValue;

    case "greaterThan":
      return userValue > ruleValue;

    case "includes":
      return Array.isArray(userValue) && userValue.includes(ruleValue);

    default:
      return false;
  }
}
