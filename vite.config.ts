import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import vitePluginRequire from "vite-plugin-require";

// https://vitejs.dev/config/
export default defineConfig({
  // root: path.resolve(__dirname,'./src'),
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  plugins: [react(), vitePluginRequire({})],
  define: { global: "globalThis", "process.env": {} },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
});
