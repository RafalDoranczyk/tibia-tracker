"use client";

import { Box, type BoxProps, Fade, Stack, Typography } from "@mui/material";

import { DefaultImage } from "./DefaultImage";
import { EmptyChartImage } from "./EmptyChartImage";
import { EmptyFoodImage } from "./EmptyFoodImage";
import { EmptyHistoryImage } from "./EmptyHistoryImage";
import { EmptyPlateImage } from "./EmptyPlateImage";

export type EmptySvgProps = {
  height: number;
  width: number;
};

type ImageType = "default" | "plate" | "food" | "chart" | "history";
type Sizes = "big" | "medium" | "small";

type EmptyStateProps = BoxProps & {
  action?: React.ReactNode;
  fullHeight?: boolean;
  size?: Sizes;
  subtitle?: string;
  title?: string;
  type?: ImageType;
};

const ImageMap: Record<ImageType, React.FC<EmptySvgProps>> = {
  default: DefaultImage,
  plate: EmptyPlateImage,
  food: EmptyFoodImage,
  chart: EmptyChartImage,
  history: EmptyHistoryImage,
};

const ImageSizesMap: Record<Sizes, EmptySvgProps> = {
  big: { height: 200, width: 200 },
  medium: { height: 150, width: 150 },
  small: { height: 100, width: 100 },
};

export function EmptyState({
  action,
  fullHeight = true,
  size = "big",
  subtitle,
  title = "Nothing here yet",
  type = "default",
  ...boxProps
}: EmptyStateProps) {
  const Image = ImageMap[type];
  const imageSize = ImageSizesMap[size];

  return (
    <Fade in timeout={600}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={fullHeight ? "100%" : "auto"}
        aria-label={title}
        {...boxProps}
      >
        <Stack alignItems="center" spacing={2} maxWidth={360} textAlign="center">
          <Box
            sx={{
              opacity: 0.8,
              transition: "opacity 0.2s ease",
              "&:hover": { opacity: 1 },
            }}
          >
            <Image {...imageSize} />
          </Box>

          <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}

          {action && <Box>{action}</Box>}
        </Stack>
      </Box>
    </Fade>
  );
}
