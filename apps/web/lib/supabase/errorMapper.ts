export type SupabaseErrorShape = {
  code?: string;
  message?: string;
  details?: string;
  status?: number;
};

export function createSupabaseErrorMapper<T>(map: (error: SupabaseErrorShape) => T) {
  return function mapError(error: unknown): T {
    if (!error || typeof error !== "object") {
      return map({ message: "Unknown Supabase error" });
    }

    return map(error as SupabaseErrorShape);
  };
}
