"use client";

import BugReportSharp from "@mui/icons-material/BugReportSharp";
import { Avatar, Divider, Stack, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";

import { ControlledTextField } from "@/components/form/ControlledTextField";

import type { HuntSessionFormValues } from "../../types";

export function HuntSessionInputDamageSources() {
  const { control } = useFormContext<HuntSessionFormValues>();

  const { fields } = useFieldArray({
    control,
    name: "damage_sources",
  });

  return (
    <Stack spacing={2}>
      <div>
        <Stack direction="row" alignItems="center" gap={1} mb={1}>
          <BugReportSharp fontSize="small" />
          <Typography variant="subtitle2" fontWeight="bold">
            Damage Sources
          </Typography>
        </Stack>
        <Divider />
      </div>

      {fields.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          Upload session log to adjust damage sources
        </Typography>
      ) : (
        fields.map((field, i) => {
          return (
            <Stack
              key={field.id}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <Avatar
                  src={field?.damage_source.image_url}
                  alt={field?.damage_source.name}
                  sx={{ width: 28, height: 28 }}
                  variant="rounded"
                />

                <Typography>{field?.damage_source.name}</Typography>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <ControlledTextField
                  size="small"
                  control={control}
                  name={`damage_sources.${i}.percent`}
                  type="number"
                  label="Percent"
                  sx={{ width: 90 }}
                />
              </Stack>
            </Stack>
          );
        })
      )}
    </Stack>
  );
}
