export function minute(minutes: number = 1): Temporal.Duration {
  return Temporal.Duration.from({ minutes });
}

export function hour(hours: number = 1): Temporal.Duration {
  return Temporal.Duration.from({ hours });
}

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
