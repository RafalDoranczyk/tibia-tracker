"use client";

import { alpha, Box, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { RASHID_LOCATIONS } from "../constants";
import { NAVIGATION_IMAGES } from "../images";

export function Rashid() {
  const today = new Date().getDay();
  const currentLocation = RASHID_LOCATIONS[today];
  const avatarSize = 48;

  return (
    <Tooltip title={`Rashid is currently in ${currentLocation}`} arrow placement="bottom">
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          px: 2,
          py: 0.2,
          borderRadius: 10,
          bgcolor: (theme) => alpha(theme.palette.divider, 0.05),
          border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.08)}`,
          transition: "all 0.2s ease",
          "&:hover": {
            bgcolor: (theme) => alpha(theme.palette.divider, 0.08),
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
          },
        }}
      >
        <Box
          sx={{
            width: avatarSize,
            height: avatarSize,
            position: "relative",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: 2,
            border: (theme) => `2px solid ${theme.palette.background.paper}`,
          }}
        >
          <Image
            src={NAVIGATION_IMAGES.rashid}
            alt="Rashid"
            fill
            sizes={`${avatarSize}px`}
            style={{ objectFit: "cover" }}
            priority
          />
        </Box>

        <Box sx={{ pr: 1 }}>
          <Typography
            variant="caption"
            sx={{
              display: "block",
              fontWeight: 800,
              fontSize: "0.6rem",
              color: "text.secondary",
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: 0.5,
            }}
          >
            Traveling Trader
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              mt: 0.6,
              fontWeight: 900,
              color: "secondary.main",
              display: "flex",
              alignItems: "center",
              gap: 0.7,
            }}
          >
            <Box
              component="span"
              sx={{ width: 6, height: 6, bgcolor: "success.main", borderRadius: "50%" }}
            />
            {currentLocation}
          </Typography>
        </Box>
      </Stack>
    </Tooltip>
  );
}
