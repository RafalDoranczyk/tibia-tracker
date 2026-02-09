"use client";

import { Box } from "@mui/material";
import Image from "next/image";

type MonsterPortraitFrameProps = {
  src: string;
  alt: string;
  size?: number;
};

export function MonsterPortraitFrame({ src, alt, size = 72 }: MonsterPortraitFrameProps) {
  return (
    <Box
      sx={{
        width: size,
        height: size,
        position: "relative",
        borderRadius: 1,
        overflow: "hidden",

        // 🔵 ten „lepszy” niebieski
        background: "radial-gradient(circle at top, #3b82f6, #1e3a8a 70%)",

        clipPath:
          "polygon(6% 0%, 94% 0%, 100% 12%, 98% 40%, 100% 65%, 94% 100%, 6% 100%, 0% 88%, 2% 50%, 0% 12%)",

        boxShadow: `
          inset 0 0 0 2px rgba(255,255,255,0.15),
          inset 0 0 12px rgba(0,0,0,0.7),
          0 6px 14px rgba(0,0,0,0.7)
        `,

        transition: "transform 200ms ease, box-shadow 200ms ease",

        "&:hover": {
          transform: "translateY(-3px) scale(1.04)",
          boxShadow: `
            inset 0 0 0 2px rgba(255,255,255,0.25),
            0 0 18px rgba(59,130,246,0.6),
            0 10px 24px rgba(0,0,0,0.9)
          `,
        },
      }}
    >
      {/* subtle magic highlight */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.12), transparent 45%)",
          pointerEvents: "none",
        }}
      />

      {/* monster image */}
      <Box
        sx={{
          position: "absolute",
          inset: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={size - 12}
          height={size - 12}
          style={{ imageRendering: "pixelated" }}
        />
      </Box>
    </Box>
  );
}
