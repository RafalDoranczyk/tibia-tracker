import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type SectionPaperCardProps = {
  title: string;
  icon: ReactNode;
};

export function SectionPaperCard({
  children,
  title,
  icon,
}: PropsWithChildren<SectionPaperCardProps>) {
  return (
    <Paper
      variant="outlined"
      sx={{
        height: "100%",
        p: 2,
        background: "rgba(20,20,32,0.85)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        {icon}
        <Typography fontWeight={700}>{title}</Typography>
      </Stack>

      <Divider sx={{ mt: 1.5 }} />

      <Box mt={2}>{children}</Box>
    </Paper>
  );
}
