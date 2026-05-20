import { describe, expect, it } from "vitest";
import {
  dateRange,
  isBeforeNoon,
  JST_OFFSET,
  timestampToDateString,
} from "./date";

describe("isBeforeNoon", () => {
  it("returns true at 11:59:59 UTC", () => {
    const ts = Date.parse("2024-06-19T11:59:59Z");
    expect(isBeforeNoon(ts)).toBe(true);
  });

  it("returns false at 12:00:00 UTC", () => {
    const ts = Date.parse("2024-06-19T12:00:00Z");
    expect(isBeforeNoon(ts)).toBe(false);
  });

  it("returns true at 11:59:59 JST", () => {
    const ts = Date.parse("2024-06-19T11:59:59+09:00");
    expect(isBeforeNoon(ts, JST_OFFSET)).toBe(true);
  });

  it("returns false at 12:00:00 JST", () => {
    const ts = Date.parse("2024-06-19T12:00:00+09:00");
    expect(isBeforeNoon(ts, JST_OFFSET)).toBe(false);
  });
});

describe("timestampToDateString", () => {
  it("returns date string in UTC", () => {
    const str = timestampToDateString(1718831922710);
    expect(str).toBe("2024-06-19");
  });

  it("returns date string in JST", () => {
    const str = timestampToDateString(1718831922710, "Asia/Tokyo");
    expect(str).toBe("2024-06-20");
  });
});

describe("dateRange", () => {
  it("generates consecutive dates", () => {
    const arr = [...dateRange("2024-06-19", "2024-06-21")];
    expect(arr).toEqual(["2024-06-19", "2024-06-20", "2024-06-21"]);
  });

  it("works across new year", () => {
    const arr = [...dateRange("2024-12-31", "2025-01-01")];
    expect(arr).toEqual(["2024-12-31", "2025-01-01"]);
  });

  it("works on leap years", () => {
    const arr = [...dateRange("2024-02-28", "2024-03-01")];
    expect(arr).toEqual(["2024-02-28", "2024-02-29", "2024-03-01"]);
  });
});
