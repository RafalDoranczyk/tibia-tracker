"use client";

import BugReportSharp from "@mui/icons-material/BugReportSharp";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import {
  type Control,
  type FieldArrayWithId,
  useFieldArray,
  useFormContext,
} from "react-hook-form";

import { ControlledTextField } from "@/components/form/ControlledTextField";

import type { HuntSessionFormValues } from "../../types";

type DamageSourceRowProps = {
  i: number;
  field: FieldArrayWithId<HuntSessionFormValues, "damage_sources", "id">;
  control: Control<HuntSessionFormValues>;
};

function DamageSourceRow({ i, field, control }: DamageSourceRowProps) {
  const source = field?.damage_source;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      px={1}
      py={0.5}
      sx={{
        borderRadius: 1,
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      {/* Source */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
        <Avatar
          src={source?.image_url}
          alt={source?.name}
          sx={{ width: 28, height: 28 }}
          variant="rounded"
        />
        <Typography variant="body2" fontWeight={500}>
          {source?.name}
        </Typography>
      </Stack>

      {/* Percent */}
      <ControlledTextField
        size="small"
        control={control}
        name={`damage_sources.${i}.percent`}
        type="number"
        sx={{ width: 90 }}
      />
    </Stack>
  );
}

export function HuntSessionInputDamageSources() {
  const { control } = useFormContext<HuntSessionFormValues>();

  const { fields } = useFieldArray({
    control,
    name: "damage_sources",
  });

  return (
    <Stack spacing={2}>
      {/* Section Header */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <BugReportSharp color="info" fontSize="small" />
        <Typography fontWeight={700}>Damage Sources</Typography>
      </Stack>
      <Divider />

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Upload session log to adjust damage sources
        </Typography>
      ) : (
        <Stack spacing={1}>
          {/* Header row */}
          <Stack direction="row" spacing={2} px={1}>
            <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
              Source
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ width: 90 }}>
              Percent
            </Typography>
          </Stack>

          <Divider />

          {/* Rows */}
          {fields.map((field, i) => (
            <DamageSourceRow key={field.id} i={i} field={field} control={control} />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
