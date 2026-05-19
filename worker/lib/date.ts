export function timestampToDateJST(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString("sv", {
    timeZone: "Asia/Tokyo",
  });
}
