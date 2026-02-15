import schemes from "../../data/schemes.json" with { type: "json" };
import { type Scheme, type UserProfile } from "../types/schemeTypes.js";
import { evaluateRule } from "./ruleEvaluator.js";

const schemeList = schemes as Scheme[];

interface SchemeMatchResult extends Scheme {
  matchScore: number;
  totalRules: number;
  matchedRules: number;
  explanation: string;
}

export function getSubsidyRecommendations(
  user: UserProfile
): SchemeMatchResult[] {

  const results: SchemeMatchResult[] = [];

  schemeList.forEach((scheme) => {

    const totalRules = scheme.eligibilityRules.length;

    if (totalRules === 0) {
      results.push({
        ...scheme,
        matchScore: 100,
        totalRules: 0,
        matchedRules: 0,
        explanation: ""
      });
      return;
    }

    let matchedRules = 0;

    scheme.eligibilityRules.forEach((rule) => {

      const userValue = (user as any)[rule.field];

      if (
        evaluateRule(userValue, rule.operator, rule.value)
      ) {
        matchedRules++;
      }
    });

    const matchScore = (matchedRules / totalRules) * 100;

    if (matchedRules > 0) {
      results.push({
        ...scheme,
        matchScore: Math.round(matchScore),
        totalRules,
        matchedRules,
        explanation: ""
      });
    }
  });

  return results.sort(
    (a, b) => b.matchScore - a.matchScore
  );
}
