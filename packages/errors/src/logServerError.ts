import { AppError } from "./AppError";

export function logServerError(error: unknown) {
  if (process.env.NODE_ENV === "production") return;

  if (error instanceof AppError) {
    console.group("🔥 Server AppError");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    console.error("Cause:", error.cause);
    console.error("Details:", error.details);
    console.groupEnd();
  } else {
    console.error("🔥 Server Unknown Error:", error);
  }
}
