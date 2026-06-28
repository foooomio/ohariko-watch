export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

export function toPlainTime(milliseconds: number): Temporal.PlainTime {
  return Temporal.PlainTime.from({ hour: 0 }).add({ milliseconds });
}

export function* dateRange(
  start: Temporal.PlainDate,
  end: Temporal.PlainDate,
): Generator<Temporal.PlainDate> {
  let current = start;
  while (Temporal.PlainDate.compare(current, end) <= 0) {
    yield current;
    current = current.add({ days: 1 });
  }
}
