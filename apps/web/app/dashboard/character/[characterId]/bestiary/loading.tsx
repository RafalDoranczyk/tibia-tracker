import { Box, Grid, Paper, Skeleton, Stack } from "@mui/material";

function SummaryBoxSkeleton() {
  return (
    <Paper sx={{ p: 2, border: "1px solid", borderColor: "divider" }}>
      <Stack spacing={2}>
        <Skeleton variant="text" width="60%" height={20} />
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="text" width="20%" />
          </Stack>
          <Skeleton variant="rounded" height={6} />
        </Stack>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width="45%" />
            <Skeleton variant="text" width="15%" />
          </Stack>
          <Skeleton variant="rounded" height={6} />
        </Stack>
      </Stack>
    </Paper>
  );
}

function FiltersSkeleton() {
  return (
    <Paper sx={{ border: "1px solid", borderColor: "divider", overflow: "hidden" }}>
      <Skeleton variant="rectangular" height={6} width="100%" />
      <Box sx={{ p: 2.5 }}>
        <Stack spacing={2.5}>
          <Stack direction="row" justifyContent="space-between">
            <Skeleton variant="text" width={150} height={24} />
            <Skeleton variant="text" width={80} height={24} />
          </Stack>
          <Stack direction="row" spacing={1.5}>
            <Skeleton variant="rounded" height={40} sx={{ width: 160 }} />
            <Skeleton variant="rounded" height={40} sx={{ width: 140 }} />
            <Skeleton variant="rounded" height={40} sx={{ width: 140 }} />
            <Skeleton variant="rounded" height={40} sx={{ flex: 1 }} />
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}

function MonsterCardSkeleton() {
  return (
    <Paper sx={{ p: 2, border: "1px solid", borderColor: "divider", width: "100%" }}>
      <Stack direction="row" spacing={2} mb={2}>
        <Skeleton variant="rounded" width={64} height={64} />
        <Stack spacing={0.5} flex={1}>
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="40%" height={18} />
        </Stack>
      </Stack>
      <Stack spacing={1}>
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="rounded" height={6} sx={{ mt: 1 }} />
      </Stack>
    </Paper>
  );
}

export default function Loading() {
  return (
    <Stack direction={{ xs: "column", lg: "row" }} spacing={4} sx={{ mt: 2 }}>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack spacing={4}>
          <FiltersSkeleton />

          <Grid container spacing={4}>
            {Array.from({ length: 12 }).map((_, idx) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeletons are static
              <Grid key={idx} size={{ xs: 12, sm: 6, lg: 6, xl: 4, xxl: 2.4 }}>
                <MonsterCardSkeleton />
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Box>

      <Box sx={{ width: { xs: "100%", lg: 320 }, flexShrink: 0 }}>
        <Stack spacing={2}>
          <SummaryBoxSkeleton />
          <SummaryBoxSkeleton />
        </Stack>
      </Box>
    </Stack>
  );
}
