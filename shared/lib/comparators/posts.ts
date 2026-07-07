import type { Post } from "../../types/stats";

export function byDateAsc(a: Post, b: Post): number {
  return Temporal.PlainDate.compare(a.date, b.date);
}

export function byDateDesc(a: Post, b: Post): number {
  return Temporal.PlainDate.compare(b.date, a.date);
}

export function byElapsedAsc(a: Post, b: Post): number {
  if (a.elapsed === null) return 1;
  if (b.elapsed === null) return -1;
  return Temporal.Duration.compare(a.elapsed, b.elapsed);
}

export function byElapsedDesc(a: Post, b: Post): number {
  if (a.elapsed === null) return 1;
  if (b.elapsed === null) return -1;
  return Temporal.Duration.compare(b.elapsed, a.elapsed);
}
