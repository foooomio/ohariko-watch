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
    label: "投稿一覧",
    to: "/posts",
  },
  {
    label: "連続記録一覧",
    to: "/streaks",
  },
  {
    label: "このサイトについて",
    to: "/about",
  },
] as const satisfies Link[];
