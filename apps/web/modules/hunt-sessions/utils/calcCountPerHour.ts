export function calcCountPerHour<T extends { count: number }>(
  items: T[],
  minutes: number
): (T & { count_per_hour: number })[] {
  const ratio = 60 / minutes;

  return items.map((item) => ({
    ...item,
    count_per_hour: Math.round(item.count * ratio),
  }));
}
