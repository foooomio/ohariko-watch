import {
  Anchor,
  Card,
  createTheme,
  Table,
  type MantineColorsTuple,
} from "@mantine/core";

const brown: MantineColorsTuple = [
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
];

export const theme = createTheme({
  black: brown[9],
  colors: {
    brown,
  },
  components: {
    Anchor: Anchor.extend({
      defaultProps: {
        underline: "always",
        c: "brown.8",
      },
    }),
    Card: Card.extend({
      defaultProps: {
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: brown[1],
        },
      },
    }),
    Table: Table.extend({
      defaultProps: {
        striped: true,
        stripedColor: "brown.0",
        withRowBorders: false,
      },
    }),
  },
});
