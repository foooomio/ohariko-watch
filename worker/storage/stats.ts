import type {
  StatsJson,
  StatsJsonName,
  StatsValueMap,
} from "~/shared/types/json";

export async function putStatsJson<T extends StatsJsonName>(
  bucket: R2Bucket,
  name: T,
  payload: StatsValueMap[T],
) {
  const key = `stats/${name}.json`;

  const json: StatsJson<StatsValueMap[T]> = {
    generatedAt: Date.now(),
    payload,
  };

  await bucket.put(key, JSON.stringify(json), {
    httpMetadata: {
      contentType: "application/json",
      cacheControl: "no-cache",
    },
  });
}
