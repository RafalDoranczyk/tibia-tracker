import { Box, Card, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import type { ReactNode } from "react";

import { getImageUrl } from "@/core/supabase";

type CardLayoutProps = {
  name: string;
  description?: string | null;
  imagePath: string;
  unlocked: boolean;
  level?: number;
  children?: ReactNode;
};

export function CardLayout({
  name,
  description,
  imagePath,
  unlocked,
  level,
  children,
}: CardLayoutProps) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        position: "relative",
        overflow: "hidden",
        transition: "0.2s ease",
        bgcolor: unlocked ? "background.paper" : "rgba(0,0,0,0.3)",
        boxShadow: unlocked ? "0 0 10px rgba(0,255,120,0.25)" : 2,
        opacity: unlocked ? 1 : 0.8,
      }}
    >
      {/* Icon */}
      <Box sx={{ display: "flex", justifyContent: "center", pt: 2 }}>
        <CardMedia
          component="img"
          image={getImageUrl(imagePath)}
          alt={name}
          sx={{
            width: 32,
            height: 32,
            objectFit: "contain",
            filter: unlocked ? "drop-shadow(0 0 6px rgba(0,255,120,0.6))" : "grayscale(1)",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          textAlign: "center",
          px: 2,
          pb: 1,
          flexGrow: 1,
        }}
      >
        <Typography variant="overline" display="block">
          {name}
        </Typography>

        {unlocked && typeof level === "number" && (
          <Chip
            label={`Level ${level}`}
            size="small"
            color="success"
            sx={{ fontWeight: 600, mt: 0.5 }}
          />
        )}

        {description && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 1, minHeight: 32 }}
          >
            {description}
          </Typography>
        )}
      </CardContent>

      {/* Actions / custom content */}
      {children && <Box sx={{ px: 1.5, pb: 1.5 }}>{children}</Box>}
    </Card>
  );
}
