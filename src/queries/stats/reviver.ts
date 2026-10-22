export function postsReviver(key: string, value: any): any {
  if (value === null) {
    return value;
  }

  switch (key) {
    case "date":
      return Temporal.PlainDate.from(value);
    case "datetime":
    case "generatedAt":
      return Temporal.ZonedDateTime.from(value);
    case "elapsed":
      return Temporal.Duration.from(value);
    default:
      return value;
  }
}

export function streaksReviver(key: string, value: any): any {
  switch (key) {
    case "startDate":
    case "endDate":
      return Temporal.PlainDate.from(value);
    case "generatedAt":
      return Temporal.ZonedDateTime.from(value);
    default:
      return value;
  }
}
