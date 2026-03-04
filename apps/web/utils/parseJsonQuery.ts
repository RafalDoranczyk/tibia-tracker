export function parseJsonQuery<T = unknown>(value: string): T | null {
  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}
