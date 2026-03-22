import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // 插件
  plugins: [
    vue(),
    tailwindcss(),
  ],
  // 为 ./src 提供别名 @
  resolve: {
    alias: {
     '@': path.resolve(__dirname, 'src'),
    }
  },
  // 主动开启热更新
  server: {
    hmr: true
  }
})


