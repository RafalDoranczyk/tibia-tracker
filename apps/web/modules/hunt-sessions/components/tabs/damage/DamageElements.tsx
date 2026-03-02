import Thunderstorm from "@mui/icons-material/Thunderstorm";
import { Grid } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { EmptyState } from "@/components";
import type { DamageElement } from "@/modules/damage-elements";
import type { HuntSessionForm } from "../../../schemas";
import { SectionPaperCard } from "../SectionPaperCard";
import { StatProgressBarRow } from "./StatProgressBarRow";

type DamageElementsProps = {
  damageElementList: DamageElement[];
};

export function DamageElements({ damageElementList }: DamageElementsProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields } = useFieldArray({
    control,
    name: "damage_elements",
  });

  const damageElementMap = useMemo(
    () => Object.fromEntries(damageElementList.map((e) => [e.id, e])),
    [damageElementList]
  );

  return (
    <SectionPaperCard
      title="Damage Elements"
      icon={<Thunderstorm fontSize="small" color="primary" />}
    >
      {fields.length === 0 ? (
        <EmptyState
          size="small"
          title="Upload log to see damage elements"
          subtitle="This data is imported automatically from your Tibia log"
          variant="hunt"
        />
      ) : (
        <Grid container spacing={1}>
          {fields.map((field, i) => {
            const element = damageElementMap[field.damageElementId];

            return (
              <Grid key={field.id} size={{ xs: 12, md: 6 }}>
                <StatProgressBarRow
                  control={control}
                  name={`damage_elements.${i}.percent`}
                  label={element?.name ?? `Unknown #${field.damageElementId}`}
                  image={element?.image_path}
                  color="secondary"
                />
              </Grid>
            );
          })}
        </Grid>
      )}
    </SectionPaperCard>
  );
}
