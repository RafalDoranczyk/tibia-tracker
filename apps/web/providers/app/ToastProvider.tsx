"use client";

import SuccessIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info"; // Nowa ikona
import { Box, Snackbar as MuiSnackbar, SnackbarContent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { createContext, useState } from "react";

import type { ToastContextType, ToastType } from "@/lib/toast";

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

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
    info: (message: string) => showToast(message, "info"),
  };

  const getToastStyles = () => {
    switch (type) {
      case "error":
        return {
          main: theme.palette.error.dark,
          light: theme.palette.error.light,
          icon: <ErrorIcon sx={{ color: theme.palette.error.light }} />,
        };
      case "info":
        return {
          main: theme.palette.info.dark,
          light: theme.palette.info.light,
          icon: <InfoIcon sx={{ color: theme.palette.info.light }} />,
        };
      default:
        return {
          main: theme.palette.success.dark,
          light: theme.palette.success.light,
          icon: <SuccessIcon sx={{ color: theme.palette.success.light }} />,
        };
    }
  };

  const styles = getToastStyles();

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
              {styles.icon}
              <Box sx={{ fontWeight: 500 }}>{message}</Box>
            </Box>
          }
          sx={{
            maxWidth: 400,
            backgroundColor: styles.main,
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
              backgroundColor: styles.light,
            },
          }}
        />
      </MuiSnackbar>
    </ToastContext.Provider>
  );
}
