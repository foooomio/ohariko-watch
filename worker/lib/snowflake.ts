const TWITTER_EPOCH = 1288834974657n;

export function snowflakeIdToTimestamp(id: bigint): number {
  return Number((id >> 22n) + TWITTER_EPOCH);
}
