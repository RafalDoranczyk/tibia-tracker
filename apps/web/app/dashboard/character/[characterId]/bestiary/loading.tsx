import { Box, Grid, Skeleton, Stack } from "@mui/material";

import { PageHeaderSkeleton } from "@/layout/page/PageHeader";

function MonsterCardSkeleton() {
  return (
    <Box
      sx={{
        width: 280,
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
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

function FiltersSkeleton() {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      {/* Header */}
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
        <Skeleton variant="text" width={80} height={24} />
        <Skeleton variant="rounded" width={90} height={30} />
      </Stack>

      {/* Filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <Skeleton variant="rounded" height={40} sx={{ minWidth: 200 }} />
        <Skeleton variant="rounded" height={40} sx={{ minWidth: 180 }} />
        <Skeleton variant="rounded" height={40} sx={{ minWidth: 180 }} />
        <Skeleton variant="rounded" height={40} sx={{ minWidth: 220 }} />
      </Stack>
    </Box>
  );
}

export default function Loading() {
  return (
    <Grid container spacing={5} direction="column">
      <PageHeaderSkeleton />

      {/* Filters skeleton */}
      <FiltersSkeleton />

      {/* Monsters grid */}
      <Grid container spacing={2} mb={2}>
        {Array.from({ length: 9 }).map((_, idx) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: skeletons are static
          <Grid key={idx} sx={{ display: "flex", justifyContent: "center" }}>
            <MonsterCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
