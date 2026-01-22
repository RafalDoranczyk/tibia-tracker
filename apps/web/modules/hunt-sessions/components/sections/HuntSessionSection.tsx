import { Box, Paper } from "@mui/material";
import type { PropsWithChildren } from "react";

type HuntSessionSectionProps = PropsWithChildren<{
  title: string;
}>;

export function HuntSessionSection({ children, title }: HuntSessionSectionProps) {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Box
        sx={{
          position: "absolute",
          top: -14,
          left: 24,
          px: 1,
          py: 0.5,
          bgcolor: (t) => t.palette.primary.dark,
          borderRadius: 1,
          fontSize: 12,
          fontWeight: 600,
          color: "text.primary",
          zIndex: 2,
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Box>

      <Paper
        sx={{
          p: 3,
          pt: 4,
          borderRadius: 3,

          height: "100%",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
