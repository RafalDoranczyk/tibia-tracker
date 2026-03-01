import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { alpha, Stack, type SvgIconProps, Typography } from "@mui/material";
import { cloneElement, type ReactElement } from "react";

interface PerformanceBadgeProps {
  variant?: "bold" | "minimal";
  label?: string;
  icon?: ReactElement<SvgIconProps>;
}

export function PerformanceBadge({
  variant = "minimal",
  label = "Peak Performance",
  icon = <MilitaryTechIcon />,
}: PerformanceBadgeProps) {
  const isBold = variant === "bold";

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={isBold ? 1.5 : 1}
      sx={{
        px: isBold ? 2 : 0,
        py: isBold ? 0.75 : 0,
        borderRadius: isBold ? "12px" : "0px",
        backgroundColor: (theme) =>
          isBold ? alpha(theme.palette.secondary.main, 0.1) : "transparent",
        borderLeft: (theme) => (isBold ? `4px solid ${theme.palette.secondary.main}` : "none"),
        width: "fit-content",
      }}
    >
      {cloneElement(icon, {
        color: "secondary",
        sx: { fontSize: isBold ? 28 : 20, ...icon.props.sx },
      })}

      <Typography
        variant={isBold ? "subtitle1" : "subtitle2"}
        fontWeight={isBold ? 900 : 800}
        sx={{
          textTransform: "uppercase",
          letterSpacing: isBold ? 1.5 : 0.5,
          color: isBold ? "text.primary" : "text.secondary",
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}
