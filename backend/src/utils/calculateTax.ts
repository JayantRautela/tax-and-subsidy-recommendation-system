import taxSlabs from "../../data/taxSlabs.json" with { type: "json" };
import { type TaxSlabsData } from "../types/taxTypes.js";

const slabs = taxSlabs as TaxSlabsData;

export function calculateTax(
  income: number,
  regime: "oldRegime" | "newRegime"
): number {

  let totalTax = 0;

  slabs[regime].forEach((slab) => {
    if (income > slab.min) {
      const taxableAmount = Math.min(income, slab.max) - slab.min;
      totalTax += taxableAmount * slab.rate;
    }
  });

  return Math.round(totalTax);
}
