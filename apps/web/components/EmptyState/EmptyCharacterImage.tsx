"use client";

import { useTheme } from "@mui/material";

import type { EmptySvgProps } from "./EmptyState";

export function EmptyCharacterImage({ height, width }: EmptySvgProps) {
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

      {/* Head */}
      <circle
        cx="140"
        cy="108"
        r="18"
        fill={palette.background.paper}
        stroke={palette.primary.main}
        strokeWidth="2"
        opacity="0.95"
      />

      {/* Torso */}
      <rect
        x="118"
        y="130"
        width="44"
        height="48"
        rx="10"
        fill={palette.background.paper}
        stroke={palette.primary.main}
        strokeWidth="2"
        opacity="0.9"
      />

      {/* Left arm */}
      <line
        x1="118"
        y1="142"
        x2="96"
        y2="162"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Right arm */}
      <line
        x1="162"
        y1="142"
        x2="184"
        y2="162"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Waist / belt */}
      <line
        x1="122"
        y1="158"
        x2="158"
        y2="158"
        stroke={palette.primary.main}
        strokeWidth="3"
        opacity="0.4"
      />

      {/* Legs */}
      <line
        x1="132"
        y1="178"
        x2="120"
        y2="210"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="148"
        y1="178"
        x2="160"
        y2="210"
        stroke={palette.primary.main}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />

      {/* Ambient dots */}
      <circle cx="92" cy="120" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="188" cy="120" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="92" cy="188" r="5" fill={palette.primary.main} opacity="0.2" />
      <circle cx="188" cy="188" r="5" fill={palette.primary.main} opacity="0.2" />
    </svg>
  );
}
