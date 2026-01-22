"use client";

import ErrorOutline from "@mui/icons-material/ErrorOutline";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import WarningAmber from "@mui/icons-material/WarningAmber";
import {
  Button,
  type ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { createContext, type PropsWithChildren, useContext } from "react";

/* ======================================================
   Context
====================================================== */

type ConfirmDialogContextType = {
  open: boolean;
  onClose: () => void;
};

const ConfirmDialogContext = createContext<ConfirmDialogContextType | null>(null);

function useConfirmDialog() {
  const ctx = useContext(ConfirmDialogContext);
  if (!ctx) {
    throw new Error("ConfirmDialog.* must be used within ConfirmDialog.Root");
  }
  return ctx;
}

/* ======================================================
   Root
====================================================== */

function ConfirmDialogRoot({
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
      <Dialog
        maxWidth="xs"
        disableRestoreFocus
        fullWidth
        open={open}
        onClose={() => onOpenChange(false)}
        slotProps={{
          backdrop: {
            sx: {
              backdropFilter: "blur(4px)",
            },
          },
          paper: {
            sx: {
              borderRadius: 3,
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
            },
          },
        }}
      >
        {children}
      </Dialog>
    </ConfirmDialogContext.Provider>
  );
}

/* ======================================================
   Cancel
====================================================== */

function ConfirmDialogCancel({
  children = "Cancel",
  ...buttonProps
}: PropsWithChildren<ButtonProps>) {
  const { onClose } = useConfirmDialog();

  return (
    <Button autoFocus variant="outlined" color="inherit" onClick={onClose} {...buttonProps}>
      {children}
    </Button>
  );
}

function ConfirmDialogConfirm({
  loading,
  onClick,
  children,
  color = "error",
}: PropsWithChildren<{
  loading?: boolean;
  color?: ButtonProps["color"];
  onClick: () => void;
}>) {
  return (
    <Button loading={loading} color={color} variant="contained" onClick={onClick}>
      {children}
    </Button>
  );
}

/* ======================================================
   Variants
====================================================== */

type ConfirmDialogVariant = "danger" | "warning" | "info";

const VARIANT_CONFIG: Record<
  ConfirmDialogVariant,
  {
    iconColor: "error" | "warning" | "info";
  }
> = {
  danger: { iconColor: "error" },
  warning: { iconColor: "warning" },
  info: { iconColor: "info" },
};

const VARIANT_ICON: Record<ConfirmDialogVariant, React.ElementType> = {
  danger: ErrorOutline,
  warning: WarningAmber,
  info: InfoOutlined,
};

/* ======================================================
   Header
====================================================== */

function ConfirmDialogHeader({
  title,
  description,
  variant = "warning",
}: {
  title: string;
  description?: string;
  variant?: ConfirmDialogVariant;
}) {
  const { iconColor } = VARIANT_CONFIG[variant];
  const Icon = VARIANT_ICON[variant];

  return (
    <DialogTitle sx={{ pb: 1 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            bgcolor: (t) => `${t.palette[iconColor].main}22`,
            color: (t) => t.palette[iconColor].main,
            flexShrink: 0,
          }}
        >
          <Icon fontSize="small" />
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>

          {description && (
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          )}
        </Stack>
      </Stack>
    </DialogTitle>
  );
}

/* ======================================================
   Content
====================================================== */

function ConfirmDialogContent({ children }: { children: React.ReactNode }) {
  return (
    <DialogContent
      sx={{
        pt: 1,
        pb: 0,
      }}
    >
      {children}
    </DialogContent>
  );
}

/* ======================================================
   Actions
====================================================== */

function ConfirmDialogActions({ children }: { children: React.ReactNode }) {
  return (
    <DialogActions
      sx={{
        px: 3,
        py: 2,
        gap: 1,
        justifyContent: "flex-end",
      }}
    >
      {children}
    </DialogActions>
  );
}

/* ======================================================
   Public API
====================================================== */

export const ConfirmDialog = {
  Root: ConfirmDialogRoot,
  Header: ConfirmDialogHeader,
  Content: ConfirmDialogContent,
  Actions: ConfirmDialogActions,
  Cancel: ConfirmDialogCancel,
  Confirm: ConfirmDialogConfirm,
};
