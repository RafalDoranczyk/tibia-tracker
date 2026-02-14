import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { fonts } from "@/core/mui";
import { AppProviders } from "@/providers/app/AppProviders";

export const metadata: Metadata = {
  title: {
    template: "%s | Tibia Tracker",
    default: "Tibia Tracker",
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={fonts.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
