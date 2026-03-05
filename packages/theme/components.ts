import type { Components, Theme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const fonts = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        padding: "6px 14px",
        boxShadow: "none",
        transition: "all 0.2s ease",
        "&:hover": {
          boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
        },
      },

      containedPrimary: {
        backgroundColor: "#7B5CF5",
        "&:hover": {
          backgroundColor: "#8B6CFF",
        },
      },

      containedSecondary: {
        backgroundColor: "#E6C26A",
        color: "#1A1A1A",
        "&:hover": {
          backgroundColor: "#F0D37A",
        },
      },

      outlinedPrimary: {
        borderColor: "#7B5CF5",
        color: "#7B5CF5",
        "&:hover": {
          backgroundColor: "rgba(123,92,245,0.12)",
          borderColor: "#9B82FF",
        },
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        width: 380,
        padding: theme.spacing(3),
        background: theme.palette.background.paper,
      }),
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 8,
      }),
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: "#1C1B30",
        border: "1px solid #2E2B45",
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundImage: "none",
        boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
        border: "1px solid rgba(255,255,255,0.08)",
      },
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(6px)",
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: "#2E2B45",
      },
    },
  },

  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        marginBottom: 4,
        "&.Mui-selected": {
          backgroundColor: "rgba(123,92,245,0.16)",
          "&:hover": {
            backgroundColor: "rgba(123,92,245,0.22)",
          },
        },
      },
    },
  },

  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.background.default,

          "& fieldset": { borderColor: "#2E2B45" },
          "&:hover fieldset": { borderColor: "#7B5CF5" },
          "&.Mui-focused fieldset": { borderColor: "#7B5CF5" },
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "#7B5CF5",
        },
      }),
    },
  },

  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
    styleOverrides: {
      tooltip: {
        backgroundColor: "rgba(20, 20, 20, 0.95)",
        color: "#fff",
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        padding: "8px 12px",
        fontSize: "0.75rem",
        borderRadius: "8px",
        maxWidth: 300,
        "& .MuiTypography-root": {
          fontSize: "inherit",
        },
      },
      arrow: {
        color: "rgba(20, 20, 20, 0.95)",
        "&::before": {
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
  },

  MuiTableContainer: {
    styleOverrides: {
      root: ({ theme }) => ({
        "::-webkit-scrollbar": { width: "10px" },
        "::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.dark,
          borderRadius: "5px",
        },
        "::-webkit-scrollbar-thumb:hover": { background: theme.palette.primary.main },
        "::-webkit-scrollbar-track": { background: theme.palette.primary.light },
      }),
    },
  },

  MuiTableRow: {
    styleOverrides: {
      root: () => ({
        "&.MuiTableRow-hover:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.04) !important",
          cursor: "pointer",
        },

        "&.zebra:nth-of-type(even)": {
          backgroundColor: "rgba(255, 255, 255, 0.02)",
        },
      }),
    },
  },

  MuiTableCell: {
    styleOverrides: {
      head: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
        fontWeight: "bold",
      }),
    },
  },
};
