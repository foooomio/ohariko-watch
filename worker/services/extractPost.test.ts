import { describe, expect, it } from "vitest";
import { extractPost } from "./extractPost";

describe("extractPostInfo", () => {
  it("returns PostInfo", () => {
    const url = "https://x.com/Shigariko_/status/1803537919208202560";
    expect(extractPost(url)).toEqual({
      timestamp: 1718831922710,
      date: "2024-06-20",
      url: "https://x.com/Shigariko_/status/1803537919208202560",
    });
  });

  it("returns PostInfo when username is i", () => {
    const url = "https://x.com/i/status/1803537919208202560";
    expect(extractPost(url)).toEqual({
      timestamp: 1718831922710,
      date: "2024-06-20",
      url: "https://x.com/Shigariko_/status/1803537919208202560",
    });
  });

  it("returns null when input is invalid", () => {
    const url = "https://x.com/nijisanji_app/status/1803352030666432882";
    expect(extractPost(url)).toBeNull();
  });
});
