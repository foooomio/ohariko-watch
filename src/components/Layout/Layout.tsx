import {
  AppShell,
  Burger,
  Container,
  Group,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";

import { HeaderTitle } from "./HeaderTitle";
import { LinkButton } from "./LinkButton";
import { Footer } from "./Footer";
import { links } from "./links";

interface Props {
  children: ReactNode;
}

export function Layout({ children }: Props) {
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      aside={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: true, mobile: !opened },
      }}
    >
      <AppShell.Header style={{ borderBottomColor: theme.colors.brown[1] }}>
        <Container size="lg" h="100%">
          <Group h="100%" justify="space-between" gap="xs">
            <HeaderTitle />

            <Group gap={0} visibleFrom="sm">
              {links.map(({ label, to }) => (
                <LinkButton key={to} to={to} size="sm">
                  {label}
                </LinkButton>
              ))}
            </Group>

            <Burger hiddenFrom="sm" opened={opened} onClick={toggle} />
          </Group>
        </Container>
      </AppShell.Header>

      <AppShell.Main>
        <Container size="lg" py="lg">
          <Stack>
            <ErrorBoundary fallback="エラーが発生しました">
              {children}
              <Footer />
            </ErrorBoundary>
          </Stack>
        </Container>
      </AppShell.Main>

      <AppShell.Aside>
        {links.map(({ label, to }) => (
          <LinkButton key={to} to={to} size="xl" onClick={toggle}>
            {label}
          </LinkButton>
        ))}
      </AppShell.Aside>
    </AppShell>
  );
}
