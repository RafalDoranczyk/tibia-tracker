"use client";

import { Box, Divider, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type SectionHeaderProps = {
  icon?: ReactNode;
  title: string;
  action?: ReactNode;
  description?: string;
  size?: "small" | "medium";
};

export function SectionHeader({
  icon,
  title,
  size = "medium",
  description,
  action,
}: PropsWithChildren<SectionHeaderProps>) {
  const isSmall = size === "small";

  return (
    <div>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon && (
            <Stack justifyContent="center" alignItems="center">
              {icon}
            </Stack>
          )}
          <Typography
            variant={isSmall ? "overline" : "h6"}
            sx={{
              fontWeight: 800,
              textTransform: isSmall ? "uppercase" : "none",
              letterSpacing: isSmall ? 0.5 : 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </Stack>

        {action && <Box>{action}</Box>}
      </Stack>

      <Typography
        sx={{ maxWidth: 720, mt: 1, display: "inline-block" }}
        variant="caption"
        color="text.secondary"
      >
        {description}
      </Typography>

      {size === "medium" && <Divider sx={{ my: 2 }} />}
    </div>
  );
}
