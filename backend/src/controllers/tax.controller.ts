import { type Request, type Response } from "express";
import { compareRegimes } from "../utils/regimeComparision.js";
import { calculateTax } from "../utils/calculateTax.js";
import { calculateDeductions } from "../utils/deductionCalculator.js";
import { type UserTaxProfile } from "../types/taxTypes.js";
import { generateTaxAdvice } from "../utils/ai/taxAdvisory.js";

export const compareTaxController = async (
  req: Request,
  res: Response
) => {
  try {
    const user: UserTaxProfile = req.body;

    const result = compareRegimes(user);

    const advice = await generateTaxAdvice(result, user);

    res.status(200).json({
      success: true,
      data: result,
      advice: advice
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error comparing tax regimes",
      error
    });
  }
};

export const calculateOldRegimeController = (
  req: Request,
  res: Response
) => {
  try {
    const user: UserTaxProfile = req.body;

    const deductions = calculateDeductions(user);

    const taxableIncome =
      user.income - (user.agriculturalIncome || 0) - deductions;

    const tax = calculateTax(
      Math.max(taxableIncome, 0),
      "oldRegime"
    );

    res.status(200).json({
      success: true,
      data: {
        taxableIncome,
        tax
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating old regime tax",
      error
    });
  }
};

export const calculateNewRegimeController = (
  req: Request,
  res: Response
) => {
  try {
    const user: UserTaxProfile = req.body;

    const taxableIncome =
      user.income - (user.agriculturalIncome || 0);

    const tax = calculateTax(
      Math.max(taxableIncome, 0),
      "newRegime"
    );

    res.status(200).json({
      success: true,
      data: {
        taxableIncome,
        tax
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error calculating new regime tax",
      error
    });
  }
};
