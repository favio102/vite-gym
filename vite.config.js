import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    base: "./",
    server: {
      proxy: {
        "/api/exercisedb": {
          target: "https://exercisedb.p.rapidapi.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/exercisedb/, ""),
          headers: {
            "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            "X-RapidAPI-Key": env.RAPID_API_KEY,
          },
        },
        "/api/youtube": {
          target: "https://youtube-search-and-download.p.rapidapi.com",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/youtube/, ""),
          headers: {
            "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
            "X-RapidAPI-Key": env.RAPID_API_KEY,
          },
        },
      },
    },
  };
});
