"use client";

import SuccessIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Box, Snackbar as MuiSnackbar, SnackbarContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createContext, useContext, useState } from "react";

export type ToastContextType = {
  error: (message: string) => void;
  success: (message: string) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

type ToastType = "error" | "success";

/**
 * Provides toast notification functionality throughout the app.
 *
 * @param children - React components to be wrapped with toast context.
 */
export function ToastProvider({ children }: React.PropsWithChildren) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<ToastType>("success");

  const showToast = (message: string, toastType: ToastType) => {
    setMessage(message);
    setType(toastType);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const value: ToastContextType = {
    error: (message: string) => showToast(message, "error"),
    success: (message: string) => showToast(message, "success"),
  };

  const isSuccess = type === "success";

  return (
    <ToastContext.Provider value={value}>
      {children}
      <MuiSnackbar
        anchorOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        autoHideDuration={6000}
        onClose={handleClose}
        open={open}
      >
        <SnackbarContent
          message={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              {isSuccess ? (
                <SuccessIcon sx={{ color: theme.palette.success.light }} />
              ) : (
                <ErrorIcon sx={{ color: theme.palette.error.light }} />
              )}
              <Box sx={{ fontWeight: 500 }}>{message}</Box>
            </Box>
          }
          sx={{
            backgroundColor: isSuccess ? theme.palette.success.dark : theme.palette.error.dark,
            color: theme.palette.common.white,
            borderRadius: 2,
            px: 2.5,
            py: 1.5,
            boxShadow: theme.shadows[6],
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              left: 0,
              top: 0,
              width: 4,
              height: "100%",
              backgroundColor: isSuccess ? theme.palette.success.light : theme.palette.error.light,
            },
          }}
        />
      </MuiSnackbar>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
