"use client";

import { alpha, Box, Stack, Tooltip, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAVIGATION_IMAGES } from "../images";

const DROME_ANCHOR_UTC = Date.UTC(2026, 1, 18, 9, 0, 0);
const CYCLE_MS = 14 * 24 * 60 * 60 * 1000;

export function Drome() {
  const [timeLeft, setTimeLeft] = useState("");
  const [tooltipDate, setTooltipDate] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const now = Date.now();
      const cyclesPassed = Math.floor((now - DROME_ANCHOR_UTC) / CYCLE_MS);
      const nextReset = DROME_ANCHOR_UTC + (cyclesPassed + 1) * CYCLE_MS;
      const diff = nextReset - now;

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);

      setTimeLeft(`${d}d ${h}h ${m}m`);

      const dateObj = new Date(nextReset);
      const dd = String(dateObj.getDate()).padStart(2, "0");
      const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
      setTooltipDate(`${dd}.${mm}.${dateObj.getFullYear()}`);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return <Box sx={{ width: 140, height: 58 }} />;

  const avatarSize = 48;

  return (
    <Tooltip
      title={
        <Stack spacing={0.5} sx={{ p: 0.5 }}>
          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 700 }}>
            NEXT TIBIA DROME WAVE
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 900 }}>
            {tooltipDate} 10:00 CE(S)T
          </Typography>
          <Typography
            variant="caption"
            sx={{ pt: 0.5, mt: 0.5, borderTop: 1, borderColor: alpha("#fff", 0.1) }}
          >
            Time left: {timeLeft}
          </Typography>
        </Stack>
      }
      arrow
      placement="bottom"
    >
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
            src={NAVIGATION_IMAGES.drome}
            alt="Tibia Drome"
            fill
            sizes={`${avatarSize}px`}
            style={{ objectFit: "cover" }}
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
            Tibia Drome
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 900,
              color: "secondary.main",
              mt: 0.6,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {timeLeft}
          </Typography>
        </Box>
      </Stack>
    </Tooltip>
  );
}
