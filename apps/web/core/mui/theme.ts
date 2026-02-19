import { createTheme } from "@mui/material";
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

export const theme = createTheme({
  cssVariables: true,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 2200,
    },
  },

  palette: {
    mode: "dark",

    background: {
      default: "#0B0A14", // dark violet-black
      paper: "#171628", // elevated violet
    },

    primary: {
      main: "#7B5CF5", // royal purple
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#E6C26A", // antique gold
      contrastText: "#1A1A1A",
    },

    error: {
      main: "#D44C4C",
      contrastText: "#FFFFFF",
    },

    success: {
      main: "#4CAF88",
      contrastText: "#0B0A14",
    },

    warning: {
      main: "#E6A23C",
    },

    text: {
      primary: "#F3F0E8", // warm ivory
      secondary: "#C6C2B8",
      disabled: "#7A7685",
    },

    divider: "#2E2B45",
  },

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',

    h1: { fontSize: "2rem", fontWeight: 700, color: "#E6C26A" },
    h2: { fontSize: "1.5rem", fontWeight: 600, color: "#F3F0E8" },
    h3: { fontSize: "1.25rem", fontWeight: 500, color: "#F3F0E8" },
    h4: { fontSize: "1.125rem", fontWeight: 500, color: "#F3F0E8" },
    h5: { fontSize: "1rem", fontWeight: 500, color: "#F3F0E8" },
    h6: { fontSize: "0.875rem", fontWeight: 500, color: "#F3F0E8" },

    body1: {
      fontSize: "0.9rem",
      color: "#F3F0E8",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.8rem",
      color: "#C6C2B8",
      lineHeight: 1.5,
    },

    button: {
      fontSize: "0.8rem",
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 6,
  },

  components: {
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
        root: {
          backgroundColor: "#171628",
          border: "1px solid #2E2B45",
        },
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
  },
});
