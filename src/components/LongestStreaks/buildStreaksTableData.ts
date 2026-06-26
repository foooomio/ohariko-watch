import type { SortedBy } from "~/shared/types/sortedBy";
import type { Streak } from "~/shared/types/stats";

export interface StreaksTableRowData {
  key: string;
  rank: string;
  daysStr: string;
  period: string;
}

export function buildStreaksTableData(
  sortedStreaks: SortedBy<Streak, "days", "desc">,
): StreaksTableRowData[] {
  const emoji = ["🥇", "🥈", "🥉"];

  const rows: StreaksTableRowData[] = [];

  let index = 0;
  let prevDays = 0;

  for (const { days, startDate, endDate } of sortedStreaks) {
    let rank = "";
    let daysStr = "";

    if (index < emoji.length) {
      rank += emoji[index];
    }

    if (days !== prevDays) {
      rank += index + 1 + "位";
      daysStr = days + "日";
    }

    rows.push({
      key: startDate + "_" + endDate,
      rank,
      daysStr,
      period: startDate + " 〜 " + endDate,
    });

    index++;
    prevDays = days;
  }

  return rows;
}
