import schemes from "../../../data/schemes.json" with { type: "json" };
import taxRules from "../../../data/taxRules.json" with { type: "json" };

export function retrieveRelevantContext(
  userMessage: string
) {

  const lowerMsg = userMessage.toLowerCase();

  const matchedSchemes = schemes.filter((scheme: any) =>
    lowerMsg.includes(scheme.name.toLowerCase()) ||
    lowerMsg.includes(scheme.benefitType.toLowerCase())
  );

  const matchedTaxRules = taxRules.filter((rule: any) =>
    lowerMsg.includes(rule.section.toLowerCase())
  );

  return {
    schemes: matchedSchemes.slice(0, 3),
    taxRules: matchedTaxRules.slice(0, 3)
  };
}
