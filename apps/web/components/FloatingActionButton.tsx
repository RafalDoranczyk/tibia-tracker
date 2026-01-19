"use client";

import { Box, Button, Slide } from "@mui/material";
import type { ReactNode } from "react";

type FloatingActionButtonProps = {
  visible: boolean;
  onClick: () => void;
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  bottom?: number;
};

export function FloatingActionButton({
  visible,
  onClick,
  children,
  loading = false,
  disabled = false,
  bottom = 24,
}: FloatingActionButtonProps) {
  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Box
        position="fixed"
        bottom={bottom}
        left="50%"
        sx={{
          transform: "translateX(-50%)",
          zIndex: (theme) => theme.zIndex.snackbar,
        }}
      >
        <Button
          onClick={onClick}
          variant="contained"
          size="large"
          loading={loading}
          disabled={disabled || loading}
        >
          {children}
        </Button>
      </Box>
    </Slide>
  );
}
