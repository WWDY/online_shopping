import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
      scss:{
        // 自动导入全局样式
        additionalData: "@import '@/styles/base.scss';"
      }
    }
  }

})
