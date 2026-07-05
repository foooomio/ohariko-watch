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
    label: "このサイトについて",
    to: "/about",
  },
] as const satisfies Link[];
