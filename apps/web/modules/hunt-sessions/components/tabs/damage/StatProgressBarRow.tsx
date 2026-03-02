import { Avatar, alpha, Box, LinearProgress, Stack, Typography } from "@mui/material";
import { type Control, type FieldValues, type Path, useWatch } from "react-hook-form";
import { getPublicAssetUrl } from "@/core/assets";

type StatProgressBarRowProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  image?: string;
  color?: "secondary" | "info" | "primary" | "error";
  iconIsFullUrl?: boolean;
};

export function StatProgressBarRow<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  image,
  color = "secondary",
  iconIsFullUrl = false,
}: StatProgressBarRowProps<TFieldValues>) {
  const value = useWatch({ control, name }) || 0;

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      px={1.5}
      py={1}
      sx={{
        borderRadius: 2,
        transition: "0.2s",
        "&:hover": { bgcolor: "action.hover" },
      }}
    >
      <Avatar
        src={iconIsFullUrl ? image : getPublicAssetUrl(image)}
        alt={label}
        sx={{
          width: 28,
          height: 28,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
        }}
        variant="rounded"
      />

      <Box sx={{ flex: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
          <Typography
            variant="body2"
            fontWeight={700}
            color={value > 0 ? "text.primary" : "text.disabled"}
          >
            {label}
          </Typography>
          <Typography variant="caption" fontWeight={900} color={`${color}.main`}>
            {value}%
          </Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={Number(value)}
          color={color}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: (t) => alpha(t.palette[color].main, 0.1),
            "& .MuiLinearProgress-bar": { borderRadius: 3 },
          }}
        />
      </Box>
    </Stack>
  );
}
