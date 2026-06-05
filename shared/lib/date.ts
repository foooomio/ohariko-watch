export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;
export const JST_OFFSET = 9 * HOUR;

export function isBeforeNoon(timeOfDay: number): boolean {
  return timeOfDay / HOUR < 12;
}

export function timestampToDateString(
  timestamp: number,
  timeZone: string = "UTC",
): string {
  return new Date(timestamp).toLocaleDateString("sv", { timeZone });
}

export function* dateRange(start: string, end: string): Generator<string> {
  const endTimestamp = new Date(end).getTime();

  let current = new Date(start).getTime();

  while (current <= endTimestamp) {
    yield timestampToDateString(current);
    current += DAY;
  }
}
