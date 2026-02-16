export type ToastType = "error" | "success";

export interface ToastContextType {
  error: (message: string) => void;
  success: (message: string) => void;
}
