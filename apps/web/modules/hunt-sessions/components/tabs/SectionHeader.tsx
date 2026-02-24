"use client";

import { Box, Divider, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type SectionHeaderProps = {
  icon?: ReactNode;
  title: string;
  action?: ReactNode;
  size?: "small" | "medium";
};

export function SectionHeader({
  icon,
  title,
  size = "medium",
  children,
  action,
}: PropsWithChildren<SectionHeaderProps>) {
  const isSmall = size === "small";

  return (
    <>
      <Box>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
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

        {children && <Box mt={0.5}>{children}</Box>}
      </Box>
      <Divider />
    </>
  );
}
