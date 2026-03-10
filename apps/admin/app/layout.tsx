import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { roboto } from "@/core/theme";
import { AppProviders } from "@/providers/AppProviders";

export const metadata: Metadata = {
  title: {
    template: "%s | Tibia Tracker Admin",
    default: "Tibia Tracker Admin",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
