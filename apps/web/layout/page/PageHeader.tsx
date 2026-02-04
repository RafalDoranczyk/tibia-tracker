import { Box, Skeleton, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

const PAGE_HEADER_STYLING = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  mb: 4,
  gap: 2,
} as const;

type PageHeaderSkeletonProps = {
  hasAction?: boolean;
  hasSubtitle?: boolean;
  titleWidth?: number | string;
  descriptionWidth?: number | string;
};

type PageHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  subtitle?: string;
};

export function PageHeader({ title, description, action, subtitle }: PageHeaderProps) {
  return (
    <Stack sx={PAGE_HEADER_STYLING}>
      <Stack spacing={0.5} flex={1}>
        {subtitle && (
          <Typography variant="overline" color="text.secondary">
            {subtitle}
          </Typography>
        )}

        <Typography variant="h4" component="h1">
          {title}
        </Typography>

        {description && (
          <Typography color="text.secondary" maxWidth={600}>
            {description}
          </Typography>
        )}
      </Stack>

      {action}
    </Stack>
  );
}

export function PageHeaderSkeleton({
  hasAction = false,
  hasSubtitle = false,
  titleWidth = 200,
  descriptionWidth = 400,
}: PageHeaderSkeletonProps) {
  return (
    <Box sx={PAGE_HEADER_STYLING}>
      <Box sx={{ flex: 1 }}>
        {hasSubtitle && <Skeleton height={16} width={80} variant="text" sx={{ mb: 0.5 }} />}
        <Skeleton height={40} width={titleWidth} variant="text" sx={{ mb: 1 }} />
        <Skeleton height={24} width={descriptionWidth} variant="text" />
      </Box>

      {hasAction && (
        <Box sx={{ flexShrink: 0 }}>
          <Skeleton height={40} width={140} variant="rounded" sx={{ borderRadius: 1 }} />
        </Box>
      )}
    </Box>
  );
}
