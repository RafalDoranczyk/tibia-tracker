import { DateProvider } from "./DateProvider";
import { QueryParamsProvider } from "./QueryParamsProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DateProvider>
        <QueryParamsProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryParamsProvider>
      </DateProvider>
    </ThemeProvider>
  );
}
