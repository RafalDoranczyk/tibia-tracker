import { Box, Grid, Skeleton, Stack } from "@mui/material";

function CardSkeleton() {
  return (
    <Stack
      spacing={2}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        height: "100%",
      }}
    >
      {/* Title */}
      <Skeleton variant="text" width={160} height={28} />

      {/* Inputs */}
      <Stack spacing={1}>
        <Skeleton variant="rounded" height={40} />
        <Skeleton variant="rounded" height={40} />
        <Skeleton variant="rounded" height={40} />
      </Stack>

      {/* Divider */}
      <Skeleton variant="text" width={120} />

      {/* List items */}
      <Stack spacing={1}>
        {Array.from({ length: 3 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <Skeleton key={i} variant="rounded" height={48} />
        ))}
      </Stack>
    </Stack>
  );
}

export function HuntSessionPageLoading() {
  return (
    <Box maxWidth={1600} px={2}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <CardSkeleton />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <CardSkeleton />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <CardSkeleton />
        </Grid>
      </Grid>
    </Box>
  );
}
