import type { PaletteOptions } from "@mui/material/styles";
import { colors } from "./colors";

export const palette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: colors.purple.main,
    light: colors.purple.light,
    dark: colors.purple.dark,
    contrastText: colors.purple.contrast,
  },
  secondary: {
    main: colors.gold.main,
    light: colors.gold.light,
    contrastText: colors.gold.contrast,
  },
  background: {
    default: colors.background.default,
    paper: colors.background.paper,
  },
  divider: colors.border,
};
