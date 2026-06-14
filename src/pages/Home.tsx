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

  return (
    <Container size="lg" py="lg">
      <Stack>
        <Header />

        <Summary records={recordsJson.payload} streaks={streaksJson.payload} />
        <PostingTimeScatter records={recordsJson.payload} />
        <PostingTimeHistogram records={recordsJson.payload} />
        <MonthlyStats records={recordsJson.payload} />
        <LongestStreaks streaks={streaksJson.payload} />

        <Footer />
      </Stack>
    </Container>
  );
}
