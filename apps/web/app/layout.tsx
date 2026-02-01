export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { appConfig } from "@/config";
import { AppProviders } from "@/providers/AppProviders";
import { fonts } from "@/providers/global";

export const metadata: Metadata = {
  title: appConfig.name,
  description: appConfig.description,
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
