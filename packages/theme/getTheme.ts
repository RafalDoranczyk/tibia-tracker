import { createTheme, type ThemeOptions } from "@mui/material/styles";
import { components } from "./components";
import { palette } from "./palette";

export const getTheme = (fontFamily?: string): ThemeOptions => {
  return createTheme({
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
    palette,
    typography: {
      fontFamily: fontFamily || '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    components,
  });
};
