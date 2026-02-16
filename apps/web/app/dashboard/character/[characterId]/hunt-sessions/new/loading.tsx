import { Container, Grid, Skeleton, Stack } from "@mui/material";

import { PageHeaderSkeleton } from "@/layout/page/PageHeader";

function StatsBarSkeleton() {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {Array.from({ length: 4 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
        <Stack key={i} spacing={1} sx={{ minWidth: 120 }}>
          <Skeleton variant="text" width={80} height={18} />
          <Skeleton variant="text" width={60} height={28} />
        </Stack>
      ))}
    </Stack>
  );
}

function TabsSkeleton() {
  return (
    <Stack direction="row" spacing={3}>
      {["Log Details", "Damage", "Supplies"].map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
        <Skeleton key={i} variant="text" width={90} height={36} />
      ))}
    </Stack>
  );
}

function HuntSetupSkeleton() {
  return (
    <Stack
      spacing={2}
      sx={{
        height: "100%",
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Skeleton variant="text" width={120} height={24} />

      {Array.from({ length: 3 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
        <Skeleton key={i} variant="rounded" height={40} />
      ))}
    </Stack>
  );
}

function EmptyStatePanelSkeleton({ titleWidth = 160 }: { titleWidth?: number }) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 2,
        minHeight: 260,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Skeleton variant="text" width={titleWidth} height={24} />
      <Skeleton variant="circular" width={48} height={48} />
      <Skeleton variant="text" width={180} height={20} />
    </Stack>
  );
}

export default function HuntSessionPageLoading() {
  return (
    <Container maxWidth="xl">
      {/* Breadcrumbs */}
      <Stack direction="row" spacing={1} mb={1}>
        <Skeleton width={90} height={24} />
        <Skeleton width={10} height={24} />
        <Skeleton width={120} height={24} />
      </Stack>

      <PageHeaderSkeleton />

      {/* TOP STATS */}
      <Stack mt={3} mb={2}>
        <StatsBarSkeleton />
      </Stack>

      {/* TABS */}
      <Stack mb={3}>
        <TabsSkeleton />
      </Stack>

      {/* MAIN GRID */}
      <Grid container spacing={2}>
        {/* LEFT */}
        <Grid size={{ xs: 12, lg: 3 }}>
          <HuntSetupSkeleton />
        </Grid>

        {/* CENTER */}
        <Grid size={{ xs: 12, lg: 4.5 }}>
          <EmptyStatePanelSkeleton titleWidth={150} />
        </Grid>

        {/* RIGHT */}
        <Grid size={{ xs: 12, lg: 4.5 }}>
          <EmptyStatePanelSkeleton titleWidth={140} />
        </Grid>
      </Grid>
    </Container>
  );
}
