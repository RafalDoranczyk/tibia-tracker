import { PageHeader } from "@/components";
import { CharacterTrainingView } from "@/modules/training-calculator";

export default function TrainingCalculator() {
  return (
    <div>
      <PageHeader.Root
        title="Training Time Calculator"
        description="Estimate the time required to reach your desired skill level while training offline or online."
      />
      <CharacterTrainingView />
    </div>
  );
}
