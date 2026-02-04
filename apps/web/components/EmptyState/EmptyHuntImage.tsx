"use client";

import { useTheme } from "@mui/material";

import type { EmptySvgProps } from "./EmptyState";

export function EmptyHuntImage({ height, width }: EmptySvgProps) {
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

      {/* Target */}
      <circle
        cx="140"
        cy="140"
        r="20"
        stroke={palette.primary.main}
        strokeWidth="2"
        opacity="0.5"
      />
      <circle cx="140" cy="140" r="8" fill={palette.primary.main} opacity="0.35" />

      {/* Bow curve */}
      <path
        d="M110 90 C85 140, 85 140, 110 190"
        stroke={palette.primary.main}
        strokeWidth="3"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Bow string */}
      <line
        x1="110"
        y1="90"
        x2="110"
        y2="190"
        stroke={palette.primary.main}
        strokeWidth="2"
        opacity="0.35"
      />

      {/* Arrow shaft */}
      <line
        x1="110"
        y1="140"
        x2="175"
        y2="140"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Arrow head */}
      <path d="M175 140 L165 134 L165 146 Z" fill={palette.primary.main} opacity="0.6" />

      {/* Ambient dots */}
      <circle cx="92" cy="102" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="188" cy="102" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="92" cy="188" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="188" cy="188" r="5" fill={palette.primary.main} opacity="0.2" />
    </svg>
  );
}
