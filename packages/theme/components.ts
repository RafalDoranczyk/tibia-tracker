import type { Components, Theme } from "@mui/material/styles";
import { colors } from "./colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xxl: true;
  }
}

export const components: Components<Theme> = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        padding: "6px 14px",
        boxShadow: "none",
        textTransform: "none",
        transition: "all 0.2s ease",
        "&:hover": { boxShadow: "0 2px 6px rgba(0,0,0,0.35)" },
      },
      containedPrimary: ({ theme }) => ({
        "&:hover": { backgroundColor: theme.palette.primary.light },
      }),
      containedSecondary: ({ theme }) => ({
        "&:hover": { backgroundColor: theme.palette.secondary.light },
      }),
      outlinedPrimary: ({ theme }) => ({
        "&:hover": {
          backgroundColor: colors.purple.alpha12,
          borderColor: theme.palette.primary.light,
        },
      }),
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: colors.background.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 8,
        backgroundImage: "none",
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundImage: "none",
        borderRadius: 8,
        border: `1px solid ${theme.palette.divider}`,
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: theme.palette.divider },
          "&:hover fieldset": { borderColor: theme.palette.primary.main },
          "&.Mui-focused fieldset": { borderColor: theme.palette.primary.main },
        },
      }),
    },
  },
  MuiBackdrop: {
    styleOverrides: {
      root: {
        backgroundColor: colors.common.backdrop,
        backdropFilter: "blur(6px)",
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        margin: "2px 0",
        "&.Mui-selected": {
          backgroundColor: colors.purple.alpha16,
          "&:hover": { backgroundColor: colors.purple.alpha22 },
        },
      },
    },
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: colors.common.tooltip,
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: 8,
      },
      arrow: { color: colors.common.tooltip },
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
