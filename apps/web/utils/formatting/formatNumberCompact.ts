export function formatNumberCompact(value: number, precision = 2): string {
  if (value === 0) return "0";

  const absValue = Math.abs(value);
  const isNegative = value < 0;

  if (absValue >= 1_000_000) {
    const millions = absValue / 1_000_000;
    const formatted = millions.toFixed(precision).replace(/\.?0+$/, "");
    return `${isNegative ? "-" : ""}${formatted}kk`;
  }

  if (absValue >= 1_000) {
    const thousands = absValue / 1_000;
    const formatted = thousands.toFixed(precision).replace(/\.?0+$/, "");
    return `${isNegative ? "-" : ""}${formatted}k`;
  }

  return value.toString();
}
