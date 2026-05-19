import { describe, expect, it } from "vitest";
import { snowflakeIdToTimestamp } from "./snowflake";

describe("snowflakeIdToTimestamp", () => {
  it("returns timestamp", () => {
    expect(snowflakeIdToTimestamp(1803537919208202560n)).toBe(1718831922710);
  });
});
