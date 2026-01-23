import { PageHeader } from "@/components";
import { StaminaCalculator } from "@/modules/stamina-calculator";

export default function StaminaCalculatorPage() {
  return (
    <div>
      <PageHeader.Root
        title="Stamina Calculator"
        description="Find out the time required to regenerate your stamina."
      />

      <StaminaCalculator />
    </div>
  );
}
