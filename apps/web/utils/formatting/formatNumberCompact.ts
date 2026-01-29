export function formatNumberCompact(value: number, precision = 2): string {
  if (!value) return "0";

  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";

  if (abs >= 1_000_000) {
    const v = (abs / 1_000_000).toFixed(precision).replace(/\.?0+$/, "");
    return `${sign}${v}M`;
  }

  if (abs >= 1_000) {
    const v = (abs / 1_000).toFixed(precision).replace(/\.?0+$/, "");
    return `${sign}${v}k`;
  }

  return value.toString();
}
