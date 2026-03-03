import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Replace "School-Portal" with your repo name
export default defineConfig({
  plugins: [react()],
  base: "/School-Portal/",
});
