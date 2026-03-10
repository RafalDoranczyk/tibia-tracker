import { getTheme } from "@repo/theme";
import { Roboto } from "next/font/google";

export const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

export const theme = getTheme(roboto.style.fontFamily);
