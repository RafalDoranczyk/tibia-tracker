import { Box, type BoxProps, Fade, Stack, Typography } from "@mui/material";

import { DefaultEmptyImage } from "./DefaultEmptyImage";
import { EmptyCharacterImage } from "./EmptyCharacterImage";
import { EmptyEconomyImage } from "./EmptyEconomyImage";
import { EmptyHuntImage } from "./EmptyHuntImage";
import { EmptyMonstersImage } from "./EmptyMonstersImage";

/* ----------------------------------------
 * Types
 * ------------------------------------- */

export type EmptySvgProps = {
  height: number;
  width: number;
};

type EmptyImageComponent = (props: EmptySvgProps) => React.ReactNode;

type ImageType = "default" | "monsters" | "economy" | "hunt" | "character";
type Sizes = "big" | "medium" | "small";

type EmptyStateProps = BoxProps & {
  action?: React.ReactNode;
  fullHeight?: boolean;
  size?: Sizes;
  subtitle?: string;
  title?: string;
  variant?: ImageType;
};

const ImageMap: Record<ImageType, EmptyImageComponent> = {
  default: DefaultEmptyImage,
  monsters: EmptyMonstersImage,
  economy: EmptyEconomyImage,
  hunt: EmptyHuntImage,
  character: EmptyCharacterImage,
};

const ImageSizesMap: Record<Sizes, EmptySvgProps> = {
  big: { height: 200, width: 200 },
  medium: { height: 150, width: 150 },
  small: { height: 100, width: 100 },
};

/* ----------------------------------------
 * Component
 * ------------------------------------- */

export function EmptyState({
  action,
  fullHeight = true,
  size = "big",
  subtitle,
  title = "Nothing here yet",
  variant = "default",
  ...boxProps
}: EmptyStateProps) {
  const Image = ImageMap[variant];
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
        <Stack alignItems="center" spacing={1.5} maxWidth={360} textAlign="center">
          <Box
            sx={{
              opacity: 0.85,
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
