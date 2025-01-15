import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginElectronDev from './vite_plugins/vite-plugin-electron-dev'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue(), vitePluginElectronDev()],
    server: {
      port: 5000,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    base: './',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
