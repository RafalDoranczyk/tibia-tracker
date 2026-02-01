import type { Metadata } from "next";

import { PageHeader } from "@/layout/page";
import { CharacterTrainingView } from "@/modules/training-calculator";

export const metadata: Metadata = {
  title: "Training Time Calculator",
  description:
    "Estimate the time required to reach your desired skill level while training offline or online.",
};

export default function TrainingCalculatorPage() {
  return (
    <>
      <PageHeader
        title="Training Time Calculator"
        description="Estimate the time required to reach your desired skill level while training offline or online."
      />
      <CharacterTrainingView />
    </>
  );
}
