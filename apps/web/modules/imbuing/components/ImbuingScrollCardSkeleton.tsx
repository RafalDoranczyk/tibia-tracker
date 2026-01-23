import { Card, Grid, Paper, Skeleton, Stack } from "@mui/material";

export function ImbuingScrollCardSkeleton() {
  return (
    <Card variant="outlined" sx={{ px: 2, py: 1 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        px={2}
        py={1}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={140} height={28} />
        </Stack>

        <Skeleton variant="rounded" width={120} height={40} />
      </Stack>

      {/* Content */}
      <Grid container spacing={2}>
        {/* Table */}
        <Grid size={{ xs: 7 }}>
          <Paper variant="outlined" sx={{ p: 1 }}>
            {[...Array(4)].map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
              <Stack key={i} direction="row" alignItems="center" spacing={2} py={1}>
                <Skeleton variant="rounded" width={36} height={36} />
                <Skeleton variant="text" width="60%" />
                <Skeleton variant="text" width={40} />
                <Skeleton variant="rounded" width={80} height={32} />
              </Stack>
            ))}
          </Paper>
        </Grid>

        {/* Summary */}
        <Grid size={{ xs: 5 }}>
          <Paper variant="outlined" sx={{ p: 2 }}>
            <Skeleton variant="text" width={100} height={24} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Paper>
        </Grid>
      </Grid>
    </Card>
  );
}
