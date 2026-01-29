import { DateProvider, QueryParamsProvider, ThemeProvider, ToastProvider } from "./global";

export function AppProviders({ children }: { children: React.ReactNode }) {
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
