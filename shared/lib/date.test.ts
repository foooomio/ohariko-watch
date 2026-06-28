import { describe, expect, it } from "vitest";
import { dateRange } from "./date";

describe("dateRange", () => {
  it("generates consecutive dates", () => {
    const arr = [
      ...dateRange(
        Temporal.PlainDate.from("2024-06-19"),
        Temporal.PlainDate.from("2024-06-21"),
      ),
    ].map((plainDate) => plainDate.toString());
    expect(arr).toEqual(["2024-06-19", "2024-06-20", "2024-06-21"]);
  });

  it("works across new year", () => {
    const arr = [
      ...dateRange(
        Temporal.PlainDate.from("2024-12-31"),
        Temporal.PlainDate.from("2025-01-01"),
      ),
    ].map((plainDate) => plainDate.toString());
    expect(arr).toEqual(["2024-12-31", "2025-01-01"]);
  });

  it("works on leap years", () => {
    const arr = [
      ...dateRange(
        Temporal.PlainDate.from("2024-02-28"),
        Temporal.PlainDate.from("2024-03-01"),
      ),
    ].map((plainDate) => plainDate.toString());
    expect(arr).toEqual(["2024-02-28", "2024-02-29", "2024-03-01"]);
  });
});
