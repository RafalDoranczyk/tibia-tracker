import { Container, Grid, Skeleton, Stack } from "@mui/material";

import { PageHeaderSkeleton } from "@/layout/page";

function StatCardSkeleton() {
  return (
    <Stack
      spacing={1}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Skeleton variant="text" width={80} height={20} />
      <Skeleton variant="text" width={60} height={32} />
    </Stack>
  );
}
function FormPanelSkeleton() {
  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Skeleton variant="text" width={200} height={28} />

      <Grid container spacing={2}>
        {Array.from({ length: 6 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
          <Grid key={i} size={{ xs: 12, sm: 6 }}>
            <Skeleton variant="rounded" height={40} />
          </Grid>
        ))}
      </Grid>

      <Skeleton variant="text" width={160} height={24} />

      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
          <Grid key={i} size={{ xs: 12, sm: 4 }}>
            <Skeleton variant="rounded" height={40} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}
function ListPanelSkeleton() {
  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Skeleton variant="text" width={180} height={24} />

      <Stack spacing={1}>
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
          <Skeleton key={i} variant="rounded" height={48} />
        ))}
      </Stack>
    </Stack>
  );
}

export default function HuntSessionPageLoading() {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={2} mb={2}>
        <Skeleton variant="text" width={100} height={32} />
        <Skeleton variant="text" width={10} height={32} />
        <Skeleton variant="text" width={100} height={32} />
      </Stack>
      <PageHeaderSkeleton />
      {/* TOP STATS */}
      <Container maxWidth="lg" sx={{ mt: 10 }}>
        <Grid container spacing={2} mb={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
            <Grid key={i} size={{ xs: 6, md: 3 }}>
              <StatCardSkeleton />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          {/* LEFT MAIN PANEL */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <FormPanelSkeleton />
          </Grid>

          {/* RIGHT SIDEBAR */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={2}>
              <ListPanelSkeleton />
              <ListPanelSkeleton />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
