"use client";

import { useTheme } from "@mui/material";

import type { EmptySvgProps } from "./EmptyState";

export function EmptyMonstersImage({ height, width }: EmptySvgProps) {
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

      {/* Dashed search ring */}
      <circle
        cx="140"
        cy="140"
        r="64"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeDasharray="6 6"
        opacity="0.35"
      />

      {/* Monster head silhouette */}
      <path
        d="M110 140
           C110 118 126 104 140 104
           C154 104 170 118 170 140
           V156
           C170 168 160 176 148 176
           H132
           C120 176 110 168 110 156
           Z"
        fill={palette.background.paper}
        stroke={palette.primary.main}
        strokeWidth="2"
        opacity="0.85"
      />

      {/* Horns */}
      <path
        d="M122 108 L112 94"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M158 108 L168 94"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Eyes */}
      <circle cx="132" cy="140" r="4" fill={palette.primary.main} opacity="0.6" />
      <circle cx="148" cy="140" r="4" fill={palette.primary.main} opacity="0.6" />

      {/* Search slash (no monsters found) */}
      <line
        x1="110"
        y1="170"
        x2="170"
        y2="110"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* Floating dots (ambient) */}
      <circle cx="90" cy="100" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="190" cy="100" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="90" cy="190" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="190" cy="190" r="5" fill={palette.primary.main} opacity="0.2" />
    </svg>
  );
}
