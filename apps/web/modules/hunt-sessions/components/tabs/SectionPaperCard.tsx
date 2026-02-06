import { Paper } from "@mui/material";

export function SectionPaperCard({ children }: React.PropsWithChildren) {
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
      {children}
    </Paper>
  );
}
