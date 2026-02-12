import { Box, Grid, Skeleton, Stack } from "@mui/material";

export default function CharactersLoading() {
  return (
    <Box>
      <Stack spacing={1} mb={4}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Skeleton variant="text" width={220} height={40} />
        </Stack>

        {/* Subtitle */}
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="40%" />
        <Skeleton variant="text" width="35%" />
      </Stack>

      <Grid container spacing={2}>
        {Array.from({ length: 3 }).map((_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <Skeletons are static>
          <Grid size={{ xs: 12, lg: 3 }} key={index}>
            <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
