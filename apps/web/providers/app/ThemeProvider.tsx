"use client";

import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { theme } from "@/lib/mui";

/**
 * Provider component that applies the theme and font globally.
 * Wraps the app in the MUI theme and font for consistent styling.
 */
export function ThemeProvider({ children }: React.PropsWithChildren) {
  return (
    <AppRouterCacheProvider>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </AppRouterCacheProvider>
  );
}
