import { Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export const LinkButton = Button.withProps({
  component: Link,
  variant: "white",
  color: "brown.8",
});
