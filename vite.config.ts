import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
      tmpDir: "./node_modules/.tanstack/tmp",
    }),
    react(),
    cloudflare(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    license: {
      fileName: "license.md",
    },
  },
});
