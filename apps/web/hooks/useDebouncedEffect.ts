import { useEffect } from "react";

export function useDebouncedEffect(fn: () => void, delay: number, deps: unknown[]) {
  useEffect(() => {
    const t = setTimeout(fn, delay);
    return () => clearTimeout(t);
  }, [fn, delay, ...deps]);
}
