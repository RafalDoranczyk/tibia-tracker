import { Box, Divider, Stack, Typography } from "@mui/material";

import type { ImbuingScroll } from "../schemas";
import { ScrollCard } from "./ScrollCard";

type ScrollSectionProps = {
  scrolls: ImbuingScroll[];
  title: string;
};

export function ScrollSection({ scrolls, title }: ScrollSectionProps) {
  return (
    <div>
      <Stack direction="row" alignItems="center" spacing={2} mb={2} px={1}>
        <Typography variant="h5" fontWeight={800}>
          {title}
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Stack>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          lg: "repeat(2, 1fr)",
          xxl: "repeat(3, 1fr)",
        }}
        gap={2}
      >
        {scrolls.map((scroll) => (
          <ScrollCard key={scroll.key} scroll={scroll} />
        ))}
      </Box>
    </div>
  );
}
