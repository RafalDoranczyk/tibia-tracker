import { Avatar, Grid, Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Autocomplete, ControlledTextField, EmptyState, TooltipIconButton } from "@/components";
import { getPublicAssetUrl } from "@/core/assets/getPublicAssetUrl";
import type { DamageElement } from "@/modules/damage-elements";
import type { HuntSessionForm } from "../../../schemas";
import { SectionHeader } from "../SectionHeader";
import { SectionPaperCard } from "../SectionPaperCard";

type ResistancesAnalyserProps = {
  damageElementList: DamageElement[];
};

export function ResistancesAnalyser({ damageElementList }: ResistancesAnalyserProps) {
  const { control } = useFormContext<HuntSessionForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "resistances",
  });

  const usedIds = useMemo(() => fields.map((f) => f.damageElementId), [fields]);
  const usedIdSet = useMemo(() => new Set(usedIds), [usedIds]);

  const damageElementMap = useMemo(
    () => Object.fromEntries(damageElementList.map((d) => [d.id, d])),
    [damageElementList]
  );

  const options = useMemo(
    () => damageElementList.filter((d) => !usedIdSet.has(d.id)),
    [damageElementList, usedIdSet]
  );

  return (
    <Stack spacing={2}>
      <SectionHeader size="small" title="Resistances Analyser">
        <Typography variant="caption" color="text.secondary">
          Add the resistances you used during the hunt session from the Resistances Analyzer.
        </Typography>
      </SectionHeader>

      <SectionPaperCard>
        <Stack spacing={2}>
          <Autocomplete
            label="Add resistance"
            options={options}
            onChange={(item) =>
              append({
                damageElementId: item.id,
                percent: 0,
              })
            }
            renderOption={(o) => (
              <Stack direction="row" gap={2} alignItems="center">
                <Avatar
                  src={getPublicAssetUrl(o.image_path)}
                  sx={{ width: 24, height: 24 }}
                  variant="rounded"
                />
                {o.name}
              </Stack>
            )}
          />

          {fields.length !== 0 ? (
            <Grid container spacing={1}>
              {fields.map((field, i) => {
                const damageElement = damageElementMap[field.damageElementId];

                return (
                  <Grid key={field.id} size={{ xs: 12, md: 6 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={2}
                      px={1}
                      py={0.5}
                      sx={{ borderRadius: 1, "&:hover": { bgcolor: "action.hover" } }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
                        <Avatar
                          src={getPublicAssetUrl(damageElement?.image_path)}
                          sx={{ width: 28, height: 28 }}
                          variant="rounded"
                        />
                        <Typography variant="body2" fontWeight={500}>
                          {damageElement?.name ?? `Unknown resistance #${field.damageElementId}`}
                        </Typography>
                      </Stack>

                      <ControlledTextField
                        size="small"
                        control={control}
                        name={`resistances.${i}.percent`}
                        type="number"
                        sx={{ width: 90 }}
                      />

                      <TooltipIconButton variant="delete" onClick={() => remove(i)} />
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <EmptyState size="small" title="No resistances added" variant="economy" />
          )}
        </Stack>
      </SectionPaperCard>
    </Stack>
  );
}
