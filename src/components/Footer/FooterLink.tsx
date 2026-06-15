import { Text } from "@mantine/core";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  href: string;
}

export function FooterLink({ children, href }: Props) {
  return (
    <Text
      component="a"
      href={href}
      target="_blank"
      size="xs"
      c="dimmed"
      td="underline"
    >
      {children}
    </Text>
  );
}
