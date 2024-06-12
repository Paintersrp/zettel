import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { ViteImageOptimizer } from "vite-plugin-image-optimizer"

export default defineConfig({
  plugins: [react(), ViteImageOptimizer()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
