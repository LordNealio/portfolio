import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static SPA. Deploys to Vercel (see vercel.json rewrite for client routing).
export default defineConfig({
  plugins: [react()],
  server: { port: 4137 },
  preview: { port: 4137 },
});
