import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import type { Control, FieldValues, Path } from "react-hook-form";

import { ControlledTextField, TooltipIconButton } from "@/components";

type StatPercentItem<TFieldValues extends FieldValues> = {
  id: string;
  image?: string;
  label: string;
  percentFieldName: Path<TFieldValues>;
  onDelete: () => void;
};

type StatPercentRowProps<TFieldValues extends FieldValues> = StatPercentItem<TFieldValues> & {
  control: Control<TFieldValues>;
};

type DamageElementListProps<TFieldValues extends FieldValues> = {
  items: StatPercentItem<TFieldValues>[];
  control: Control<TFieldValues>;
};

function StatPercentRow<TFieldValues extends FieldValues>({
  image,
  label,
  percentFieldName,
  control,
  onDelete,
}: StatPercentRowProps<TFieldValues>) {
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
      {/* Label */}
      <Stack direction="row" spacing={1} alignItems="center" sx={{ flex: 1 }}>
        <Avatar src={image} alt={label} sx={{ width: 28, height: 28 }} variant="rounded" />
        <Typography variant="body2" fontWeight={500}>
          {label}
        </Typography>
      </Stack>

      {/* Percent */}
      <ControlledTextField
        size="small"
        control={control}
        name={percentFieldName}
        type="number"
        sx={{ width: 90 }}
      />

      {/* Delete */}
      <TooltipIconButton variant="delete" onClick={onDelete} />
    </Stack>
  );
}

export function DamageElementList<TFieldValues extends FieldValues>({
  items,
  control,
}: DamageElementListProps<TFieldValues>) {
  return (
    <Stack spacing={1}>
      {/* Header */}
      <Stack direction="row" spacing={2} px={1}>
        <Typography variant="caption" color="text.secondary" sx={{ flex: 1 }}>
          Element
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ width: 90 }}>
          Percent
        </Typography>
        <Box sx={{ width: 32 }} />
      </Stack>

      <Divider />

      {items.map((item) => (
        <StatPercentRow key={item.id} {...item} control={control} />
      ))}
    </Stack>
  );
}
