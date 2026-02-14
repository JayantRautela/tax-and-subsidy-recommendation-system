export interface TaxSlab {
  min: number;
  max: number;
  rate: number;
}

export interface TaxSlabsData {
  oldRegime: TaxSlab[];
  newRegime: TaxSlab[];
}

export interface TaxRule {
  section: string;
  title: string;
  eligibleOccupation: string;
  maxDeduction: number;
  conditions: string[];
  benefitType: string;
  description: string;
}

export interface UserTaxProfile {
  income: number;
  occupation: string;
  agriculturalIncome?: number;
  investment80C?: number;
  healthInsurance?: number;
  homeLoanInterest?: number;
  educationLoanInterest?: number;
  savingsInterest?: number;
}
