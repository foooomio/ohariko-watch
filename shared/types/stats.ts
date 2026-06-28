export interface FilledPost {
  date: Temporal.PlainDate;
  datetime: Temporal.ZonedDateTime;
  elapsed: Temporal.Duration;
  url: string;
}

export interface EmptyPost {
  date: Temporal.PlainDate;
  datetime: null;
  elapsed: null;
  url: null;
}

export type Post = FilledPost | EmptyPost;

export interface Streak {
  days: number;
  startDate: Temporal.PlainDate;
  endDate: Temporal.PlainDate;
}
