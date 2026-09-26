import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

const root = import.meta.dirname;

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      // One entry per HTML page. Add new case studies here.
      input: {
        main: resolve(root, "index.html"),
        "bereal-daily-prompt": resolve(root, "case-studies/bereal-daily-prompt/index.html"),
      },
    },
  },
});
