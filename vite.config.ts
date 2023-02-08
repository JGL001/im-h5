import { defineConfig, resolveBaseUrl } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    })
  ],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: resolve(__dirname, "src/"),
      },
      {
        find: "@/router",
        replacement: resolve(__dirname, "src/router"),
      },
      {
        find: "@/pages",
        replacement: resolve(__dirname, "src/pages"),
      },
      {
        find: "@/assets",
        replacement: resolve(__dirname, "src/assets"),
      },
      {
        find: "@/utils",
        replacement: resolve(__dirname, "src/utils"),
      },
      {
        find: "@/service",
        replacement: resolve(__dirname, "src/service"),
      },
      {
        find: "@/components",
        replacement: resolve(__dirname, "src/components"),
      },
    ]
  },
  server: {
    // 配置代理
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true, // 允许跨域
        rewrite: path => path.replace(/^\/api/, ''), // 重写路径
      }
    }
  }
})
