import { AppError } from "./AppError";

export const isAppError = (error: unknown): error is AppError => error instanceof AppError;
