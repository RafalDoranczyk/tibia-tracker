import {
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
} from "@mui/material";

import { PageHeaderSkeleton } from "@/layout/page";

function CharmCardSkeleton() {
  return (
    <Card sx={{ height: 300, borderRadius: 3, p: 2 }}>
      <Stack spacing={1} alignItems="center">
        <Skeleton variant="circular" width={32} height={32} />
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={160} />
        <Skeleton variant="text" width={180} />
        <Skeleton variant="rounded" width="100%" height={32} />
      </Stack>
    </Card>
  );
}

export default function CharmsLoading() {
  return (
    <div>
      {/* Header */}
      <PageHeaderSkeleton />
      <Container maxWidth="xl">
        {/* Progress */}
        <Box my={4}>
          <Skeleton variant="text" width={140} />
          <LinearProgress />
        </Box>

        {/* Stats */}
        <Stack direction="row" spacing={2} mb={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
            <Card key={i} sx={{ flex: 1, borderRadius: 3 }}>
              <CardContent>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={80} height={36} />
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>

      {/* Charms Grid */}
      <Container maxWidth="xxl">
        <Grid container spacing={6}>
          {/* Major */}
          <Grid size={{ xl: 6 }}>
            <Skeleton variant="text" width={180} height={30} />
            <Grid container spacing={2}>
              {Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, xxl: 3 }}>
                  <CharmCardSkeleton />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Minor */}
          <Grid size={{ xl: 6 }}>
            <Skeleton variant="text" width={180} height={30} />
            <Grid container spacing={2}>
              {Array.from({ length: 8 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
                <Grid key={i} size={{ xs: 12, sm: 6, md: 4, xxl: 3 }}>
                  <CharmCardSkeleton />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
