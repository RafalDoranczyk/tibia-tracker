"use client";

import { WarningAmber } from "@mui/icons-material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { createContext } from "react";

type ConfirmDialogContextType = {
  open: boolean;
  onClose: () => void;
};

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

export function ConfirmDialogRoot({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <ConfirmDialogContext.Provider value={{ open, onClose: () => onOpenChange(false) }}>
      <Dialog open={open} onClose={() => onOpenChange(false)} maxWidth="xs" fullWidth>
        {children}
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
}

export function ConfirmDialogContent({ children }: { children: React.ReactNode }) {
  return <DialogContent dividers>{children}</DialogContent>;
}

export function ConfirmDialogHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <DialogTitle>
      <Stack direction="row" alignItems="center" spacing={1}>
        <WarningAmber fontSize="small" color="warning" />
        <Typography variant="subtitle1">{title}</Typography>
      </Stack>
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {description}
        </Typography>
      )}
    </DialogTitle>
  );
}

export function ConfirmDialogActions({ children }: { children: React.ReactNode }) {
  return (
    <DialogActions sx={{ px: 3, pb: 2, gap: 1, justifyContent: "flex-end" }}>
      {children}
    </DialogActions>
  );
}

export const ConfirmDialog = {
  Root: ConfirmDialogRoot,
  Content: ConfirmDialogContent,
  Header: ConfirmDialogHeader,
  Actions: ConfirmDialogActions,
};
