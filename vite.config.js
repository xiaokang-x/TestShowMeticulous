import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vitejs.dev/config/
export default defineConfig(() => ({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          meticulousScript: `<script
      data-recording-token="tBIvAUGlHs3kHxPtLRO3KHqQnsgXpCQsrhxHJDOk"
      data-is-production-environment="true"
      src="https://snippet.meticulous.ai/v1/meticulous.js"
    ></script>`
        }
      }
    })
  ],
  build: {
    sourcemap: true
  }
}))
