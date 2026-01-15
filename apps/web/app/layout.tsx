import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { APP_DESCRIPTION, APP_NAME } from "@/constants";
import { AppProviders } from "@/providers/AppProviders";
import { fonts } from "@/providers/global";

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={fonts.variable}>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
