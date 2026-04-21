import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    // This allows the Railway domain to access the preview server
    allowedHosts: [
      "task-manager-frontend-production-1272.up.railway.app",
      ".up.railway.app", // This allows any Railway subdomain
    ],
    // Optional: Ensure it uses the port Railway provides
    port: import.meta.env.PORT || 8080,
    host: true,
  },
  server: {
    proxy: {
      "/api": {
        target: import.meta.env.VITE_API_BASE_URL || "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
