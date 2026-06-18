import { Card, createTheme } from "@mantine/core";

export const theme = createTheme({
  black: "#5d4037",
  colors: {
    brown: [
      "#f7f3f2",
      "#e8e6e5",
      "#d2c9c6",
      "#bdaaa4",
      "#ab9087",
      "#a17f74",
      "#9d766a",
      "#896459",
      "#7b594e",
      "#5d4037",
    ],
  },
  components: {
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
      },
      styles: (theme) => ({
        root: {
          borderColor: theme.colors.brown[1],
        },
      }),
    }),
  },
});
