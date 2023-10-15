import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'ts/utils/map/index.html', // Specify the path to your HTML file
    },
  },
})