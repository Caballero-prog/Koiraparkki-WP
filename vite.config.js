import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/wp-content/themes/koiraparkki-react/react-app/dist/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
