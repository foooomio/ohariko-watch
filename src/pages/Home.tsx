import { Container, Stack } from "@mantine/core";
import { Header } from "@/components/Header";
import { Summary } from "@/components/Summary";
import { PostingTimeScatter } from "@/components/PostingTimeScatter";
import { PostingTimeHistogram } from "@/components/PostingTimeHistogram";
import { MonthlyStats } from "@/components/MonthlyStats";
import { LongestStreaks } from "@/components/LongestStreaks";
import { Footer } from "@/components/Footer";
import { useDailyRecords } from "@/hooks/useDailyRecords";
import { useStreaks } from "@/hooks/useStreaks";

export function Home() {
  const { data: recordsJson } = useDailyRecords();
  const { data: streaksJson } = useStreaks();

  if (!recordsJson || !streaksJson) {
    return null;
  }

  const records = recordsJson.payload;
  const streaks = streaksJson.payload;
  const sortedStreaks = streaks.toSorted((a, b) => b.days - a.days);

  return (
    <Container size="lg" py="lg">
      <Stack>
        <Header />

        <Summary
          records={records}
          currentStreak={streaks.at(-1)!}
          longestStreak={sortedStreaks.at(0)!}
        />
        <PostingTimeScatter records={records} />
        <PostingTimeHistogram records={records} />
        <MonthlyStats records={records} />
        <LongestStreaks sortedStreaks={sortedStreaks} />

        <Footer />
      </Stack>
    </Container>
  );
}
