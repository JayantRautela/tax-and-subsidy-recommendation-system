import { type Request, type Response } from "express";
import { getSubsidyRecommendations } from "../utils/subsidy.js";
import { type UserProfile } from "../types/schemeTypes.js";
import { generateSchemeExplanation } from "../utils/ai/explainationService.js";

export const recommendSubsidies = async (
  req: Request,
  res: Response
) => {

  try {

    const user: UserProfile = req.body;

    const recommendations = getSubsidyRecommendations(user);

    for (const scheme of recommendations) {
      scheme.explanation = await generateSchemeExplanation(scheme, user) as string;
    }

    res.status(200).json({
      success: true,
      totalRecommendations: recommendations.length,
      data: recommendations
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recommendations",
      error
    });
  }
};
