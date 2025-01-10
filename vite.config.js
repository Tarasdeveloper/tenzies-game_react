import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { glob } from "glob";
import injectHTML from "vite-plugin-html-inject";
import FullReload from "vite-plugin-full-reload";

export default defineConfig({
  root: "src",
  build: {
    rollupOptions: {
      input: glob.sync("./src/*.html"),
    },
    outDir: "./dist",
  },
  plugins: [react(), injectHTML(), FullReload(["./src/**/**.html"])],
});
