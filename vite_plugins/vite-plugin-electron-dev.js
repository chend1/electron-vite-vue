import { spawn } from 'child_process'
import fs from 'fs'
import electron from 'electron'

export default function vitePluginElectronDev() {
  return {
    name: 'vue-electron-dev',
    configureServer(server) {
      server.httpServer.once('listening', () => {
        // 获取HTTP服务器的监听地址和端口号
        const addressInfo = server.httpServer.address()
        const IP = `http://localhost:${addressInfo.port}`
        // 启动Electron进程
        let electronProcess = null
        const startElectronProcess = () => {
          electronProcess = spawn(electron, ['electron/main.js', IP])
          // 监听主进程代码的更改
          fs.watchFile('electron/main.js', () => {
            // 杀死当前的Electron进程
            electronProcess && electronProcess.kill('SIGTERM')
            electronProcess = null
          })
          // 监听Electron进程的stdout输出
          electronProcess && electronProcess.stdout?.on('data', (data) => {
            console.log(`日志: ${data}`)
          })
          // 监听Electron进程的退出
          electronProcess && electronProcess.on('close', (data) => {
            console.log(`退出: ${data}`)
            if(data === 0) {
              // 退出所有进程
              process.exit()
            } else {
              // 重新启动Electron进程
              startElectronProcess()
            }
          })
        }
        startElectronProcess()
      })
    },
  }
}
