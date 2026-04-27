import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  plugins: [react()],

  base:
    command === "build"
      ? "/wp-content/themes/koiraparkki-react/dist/"
      : "/",

  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
}));