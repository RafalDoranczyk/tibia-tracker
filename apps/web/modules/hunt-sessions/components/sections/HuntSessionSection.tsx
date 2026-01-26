import { Box, Paper } from "@mui/material";
import type { PropsWithChildren } from "react";

type HuntSessionSectionProps = PropsWithChildren<{
  title: string;
  isRequired?: boolean;
}>;

export function HuntSessionSection({ children, title, isRequired }: HuntSessionSectionProps) {
  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      {isRequired && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            px: 1,
            py: 0.5,
            bgcolor: "primary.main",
            color: "white",
            fontSize: 10,
            fontWeight: 700,
            borderBottomLeftRadius: 8,
            zIndex: 2,
          }}
        >
          REQUIRED
        </Box>
      )}

      <Box
        sx={{
          position: "absolute",
          top: -14,
          left: 24,
          px: 1,
          py: 0.5,
          bgcolor: (t) => t.palette.background.paper,
          borderRadius: 1,
          fontSize: 12,
          fontWeight: isRequired ? 700 : 600,
          color: (t) => (isRequired ? t.palette.primary.main : t.palette.text.secondary),
          zIndex: 2,
        }}
      >
        {title}
      </Box>

      <Paper
        sx={{
          p: 3,
          pt: 4,
          borderRadius: 3,
          border: "1px solid",
          borderColor: (t) => (isRequired ? t.palette.primary.main : t.palette.divider),
          borderWidth: isRequired ? 2 : 1,
          bgcolor: (t) => (isRequired ? `${t.palette.primary.main}08` : "background.paper"),
          boxShadow: isRequired ? (t) => `0 0 0 2px ${t.palette.primary.main}20` : undefined,
          transition: "all .2s ease",
          height: "100%",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
