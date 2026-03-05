import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Forward /api calls to Flask during development
      "/transactions": "http://localhost:5000",
      "/ai-insight":   "http://localhost:5000",
      "/health":       "http://localhost:5000",
    }
  }
});
