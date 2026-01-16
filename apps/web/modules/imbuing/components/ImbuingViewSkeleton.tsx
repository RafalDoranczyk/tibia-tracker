import { Box, Skeleton, Stack } from "@mui/material";

import { ScrollCardSkeleton } from "./ScrollCardSkeleton";

function SectionSkeleton({ count }: { count: number }) {
  return (
    <Stack spacing={2}>
      {/* Section header */}
      <Stack direction="row" alignItems="center" spacing={2} px={1}>
        <Skeleton variant="text" width={160} height={34} />
        <Box flex={1} height={1} bgcolor="divider" />
      </Stack>

      {/* Cards grid */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          xl: "repeat(2, 1fr)",
          xxl: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {[...Array(count)].map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <ScrollCardSkeleton key={i} />
        ))}
      </Box>
    </Stack>
  );
}

export function ImbuingViewSkeleton() {
  return (
    <Stack spacing={3}>
      {/* Top bar */}
      <Stack alignItems="center">
        <Skeleton variant="rounded" width={140} height={40} sx={{ ml: "auto" }} />
      </Stack>

      <SectionSkeleton count={3} />
    </Stack>
  );
}
