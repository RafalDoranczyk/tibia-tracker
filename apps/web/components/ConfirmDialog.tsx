"use client";

import ErrorOutline from "@mui/icons-material/ErrorOutline";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import WarningAmber from "@mui/icons-material/WarningAmber";
import {
  alpha,
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

const VARIANT_CONFIRM_COLOR: Record<ConfirmDialogVariant, ButtonProps["color"]> = {
  danger: "error",
  warning: "warning",
  info: "primary",
};

/* ======================================================
   Context
====================================================== */

type ConfirmDialogContextType = {
  open: boolean;
  onClose: () => void;
  variant: ConfirmDialogVariant;
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
  variant = "danger",
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: ConfirmDialogVariant;
  children: React.ReactNode;
}) {
  return (
    <ConfirmDialogContext.Provider
      value={{
        open,
        variant,
        onClose: () => onOpenChange(false),
      }}
    >
      <Dialog
        maxWidth="xs"
        disableRestoreFocus
        fullWidth
        open={open}
        onClose={() => onOpenChange(false)}
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
  autoFocus,
  ...buttonProps
}: PropsWithChildren<ButtonProps>) {
  const { onClose, variant } = useConfirmDialog();

  return (
    <Button
      autoFocus={autoFocus ?? variant !== "info"}
      variant="outlined"
      color="inherit"
      onClick={onClose}
      {...buttonProps}
    >
      {children}
    </Button>
  );
}

function ConfirmDialogConfirm({
  loading,
  onClick,
  children,
}: PropsWithChildren<{
  loading?: boolean;
  color?: ButtonProps["color"];
  onClick: () => void;
}>) {
  const { variant } = useConfirmDialog();

  return (
    <Button
      loading={loading}
      color={VARIANT_CONFIRM_COLOR[variant]}
      variant="contained"
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

/* ======================================================
   Header
====================================================== */

function ConfirmDialogHeader({ title, description }: { title: string; description?: string }) {
  const { variant } = useConfirmDialog();
  const { iconColor } = VARIANT_CONFIG[variant];
  const Icon = VARIANT_ICON[variant];

  return (
    <DialogTitle sx={{ pb: 1.5 }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={(t) => ({
            width: 36,
            height: 36,
            borderRadius: "50%",
            bgcolor: alpha(t.palette[iconColor].main, 0.18),
            border: `1px solid ${alpha(t.palette[iconColor].main, 0.4)}`,
            color: t.palette[iconColor].main,
            flexShrink: 0,
          })}
        >
          <Icon fontSize="small" />
        </Stack>

        <Stack spacing={0.5}>
          <Typography variant="h6" lineHeight={1.2}>
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
  return <DialogContent dividers>{children}</DialogContent>;
}

/* ======================================================
   Actions
====================================================== */

function ConfirmDialogActions({ children }: { children: React.ReactNode }) {
  return (
    <DialogActions sx={{ px: 3, py: 2 }}>
      <Stack direction="row" spacing={1}>
        {children}
      </Stack>
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
