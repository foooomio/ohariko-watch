import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { cloudflare } from "@cloudflare/vite-plugin";

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
});
