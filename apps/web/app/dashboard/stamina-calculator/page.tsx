import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { StaminaCalculator } from "@/modules/stamina-calculator";

export const metadata: Metadata = {
  title: "Stamina Calculator",
  description: "Find out the time required to regenerate your stamina.",
};

export default function StaminaCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Stamina Calculator"
        description="Find out the time required to regenerate your stamina."
      />
      <StaminaCalculator />
    </>
  );
}
