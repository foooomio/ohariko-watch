import type { StatsJsonName } from "~/shared/types/json";

export function reviver(name: StatsJsonName): (key: string, value: any) => any {
  switch (name) {
    case "posts":
      return (key, value) => {
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
      };
    case "streaks":
      return (key, value) => {
        switch (key) {
          case "startDate":
          case "endDate":
            return Temporal.PlainDate.from(value);
          case "generatedAt":
            return Temporal.ZonedDateTime.from(value);
          default:
            return value;
        }
      };
  }
}
