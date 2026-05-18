export function timestampToDateJST(timestamp: number): string {
  return new Date(timestamp)
    .toLocaleDateString("ja", { timeZone: "Asia/Tokyo" })
    .replaceAll("/", "-");
}
