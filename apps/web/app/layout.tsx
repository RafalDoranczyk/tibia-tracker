import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { AppProviders, fonts } from "@/providers/app";

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
