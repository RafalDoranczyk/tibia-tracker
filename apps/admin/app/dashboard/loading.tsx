import { CircularProgress, Stack, Typography } from "@mui/material";

export default function DashboardLoading() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      spacing={2}
      sx={{ minHeight: "60vh", color: "white" }}
    >
      <CircularProgress color="inherit" />
      <Typography variant="h6">Loading…</Typography>
    </Stack>
  );
}
