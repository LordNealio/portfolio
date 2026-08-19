import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Static SPA. Deploys to Vercel (see vercel.json rewrite for client routing).
export default defineConfig({
  plugins: [react()],
  server: { port: 4137 },
  preview: { port: 4137 },
  build: {
    rollupOptions: {
      // Multi-page: index.html is the SPA shell; enter.html is a static copy with
      // ENIGMA Open Graph tags for the gate routes (social crawlers can't run JS).
      // Both load the same app; Vercel routes /enter,/enigma,/christie,/gnx here.
      input: { main: "index.html", enter: "enter.html" },
    },
  },
});
