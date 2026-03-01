/**
 * Helper to prevent rate limiting with random jitter
 */
export async function delay(ms: number) {
  const randomMs = ms + Math.floor(Math.random() * 300);
  return new Promise((resolve) => setTimeout(resolve, randomMs));
}
