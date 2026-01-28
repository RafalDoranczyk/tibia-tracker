"use client";

import { useTheme } from "@mui/material";

import type { EmptySvgProps } from "./EmptyState";

export function EmptyEconomyImage({ height, width }: EmptySvgProps) {
  const { palette } = useTheme();

  return (
    <svg
      aria-hidden="true"
      fill="none"
      width={width}
      height={height}
      viewBox="0 0 280 280"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background aura */}
      <circle cx="140" cy="140" r="100" fill={palette.primary.main} opacity="0.06" />

      {/* Dashed ring */}
      <circle
        cx="140"
        cy="140"
        r="64"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeDasharray="6 6"
        opacity="0.35"
      />

      {/* Coin */}
      <circle
        cx="140"
        cy="138"
        r="26"
        fill={palette.background.paper}
        stroke={palette.primary.main}
        strokeWidth="2"
        opacity="0.9"
      />

      {/* Coin inner detail */}
      <circle
        cx="140"
        cy="138"
        r="10"
        stroke={palette.primary.main}
        strokeWidth="2"
        opacity="0.4"
      />

      {/* Balance stem */}
      <line
        x1="140"
        y1="112"
        x2="140"
        y2="90"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Balance arms */}
      <line
        x1="110"
        y1="90"
        x2="170"
        y2="90"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Left scale */}
      <circle cx="118" cy="102" r="8" fill={palette.primary.main} opacity="0.25" />

      {/* Right scale */}
      <circle cx="162" cy="102" r="8" fill={palette.primary.main} opacity="0.25" />

      {/* Diagonal slash (no calculation yet) */}
      <line
        x1="108"
        y1="172"
        x2="172"
        y2="108"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* Ambient dots */}
      <circle cx="92" cy="102" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="188" cy="102" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="92" cy="188" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="188" cy="188" r="5" fill={palette.primary.main} opacity="0.2" />
    </svg>
  );
}
