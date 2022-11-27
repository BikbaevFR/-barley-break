import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

console.log("svgr", svgr);

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [svgr(), react()],
});
