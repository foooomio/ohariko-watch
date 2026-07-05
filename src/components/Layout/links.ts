interface Link {
  label: string;
  to: string;
}

export const links = [
  {
    label: "ホーム",
    to: "/",
  },
  {
    label: "投稿リスト",
    to: "/posts",
  },
  {
    label: "連続記録リスト",
    to: "/streaks",
  },
  {
    label: "このサイトについて",
    to: "/about",
  },
] as const satisfies Link[];
