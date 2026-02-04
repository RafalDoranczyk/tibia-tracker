import { Box, Grid, Skeleton, Stack } from "@mui/material";

function MonsterCardSkeleton() {
  return (
    <Box
      sx={{
        width: 280,
        p: 2,
        borderRadius: 3,
        backgroundColor: "#1c1c1c",
        boxShadow: "0 0 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <Stack direction="row" spacing={2} mb={2}>
        <Skeleton variant="rounded" width={64} height={64} />
        <Stack spacing={1} flex={1}>
          <Skeleton variant="text" width="80%" height={24} />
          <Skeleton variant="text" width="50%" height={18} />
        </Stack>
      </Stack>

      {/* Stats */}
      <Stack spacing={1} mb={2}>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="45%" />
      </Stack>

      {/* Progress */}
      <Skeleton variant="text" width="70%" />
      <Skeleton variant="rounded" height={8} sx={{ mt: 0.5 }} />
    </Box>
  );
}

export default function Loading() {
  return (
    <Grid container spacing={5} direction="column">
      {/* Filters skeleton */}
      <Grid>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Skeleton variant="rounded" width={160} height={40} />
          <Skeleton variant="rounded" width={260} height={40} />
          <Skeleton variant="rounded" width={80} height={40} />
        </Stack>
      </Grid>

      {/* Monsters grid */}
      <Grid container spacing={2} mb={2}>
        {Array.from({ length: 9 }).map((_, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
          <Grid key={idx} sx={{ display: "flex", justifyContent: "center" }}>
            <MonsterCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
