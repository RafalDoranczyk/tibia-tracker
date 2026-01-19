import type { PropsWithChildren } from "react";

import { DateProvider, QueryParamsProvider, ThemeProvider, ToastProvider } from "./global";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DateProvider>
          <QueryParamsProvider>{children}</QueryParamsProvider>
        </DateProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
