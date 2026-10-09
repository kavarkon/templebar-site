import { defineConfig } from "vite"
import { resolve } from "path"

export default defineConfig({
  appType: "spa",
  base: "/templebar-site/",

  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        events: resolve(__dirname, "events.html"),
        // menu: resolve(__dirname, 'menu.html'),
      },
    },
  },
})
