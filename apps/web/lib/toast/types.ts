export type ToastType = "error" | "success" | "info";

export interface ToastContextType {
  error: (message: string) => void;
  success: (message: string) => void;
  info: (message: string) => void;
}
