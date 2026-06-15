import { describe, expect, it } from "vitest";
import { snowflakeIdToTimestamp } from "./snowflake";

describe("snowflakeIdToTimestamp", () => {
  it("returns timestamp", () => {
    const timestamp = snowflakeIdToTimestamp(1803537919208202560n);
    expect(timestamp).toBe(1718831922710);
  });
});
