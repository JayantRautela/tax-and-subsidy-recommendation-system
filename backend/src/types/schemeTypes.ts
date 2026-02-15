export type Operator =
  | "equals"
  | "lessThanOrEqual"
  | "greaterThanOrEqual"
  | "lessThan"
  | "greaterThan"
  | "includes";

export interface EligibilityRule {
  field: string;
  operator: Operator;
  value: any;
}

export interface Scheme {
  id: string;
  name: string;
  benefitType: string;
  benefit: string;
  description: string;
  documentsRequired: string[];
  eligibilityRules: EligibilityRule[];
}

export interface UserProfile {
  occupation?: string;
  income?: number;
  annualIncome?: number;
  landSize?: number;
  turnover?: number;
  age?: number;
  gender?: string;
  residenceType?: string;
  state?: string;
}
