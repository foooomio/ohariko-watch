import type { Streak } from "../../types/stats";

export function byStartDateAsc(a: Streak, b: Streak): number {
  return Temporal.PlainDate.compare(a.startDate, b.startDate);
}

export function byStartDateDesc(a: Streak, b: Streak): number {
  return Temporal.PlainDate.compare(b.startDate, a.startDate);
}

export function byDaysAsc(a: Streak, b: Streak): number {
  return a.days === b.days ? Temporal.PlainDate.compare(a.startDate, b.startDate) : a.days - b.days;
}

export function byDaysDesc(a: Streak, b: Streak): number {
  return b.days === a.days ? Temporal.PlainDate.compare(b.startDate, a.startDate) : b.days - a.days;
}
