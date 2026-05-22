import { Button } from "@mantine/core";

export function Home() {
  const handleOnClick = () => {
    alert("おはりこ！");
  };

  return (
    <main>
      <h1>おはりこ観測所</h1>
      <Button onClick={handleOnClick}>おはりこ！</Button>
    </main>
  );
}
