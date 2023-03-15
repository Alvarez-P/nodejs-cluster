import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'

dotenv.config()

;(async () => {
  let cpuCount = os.cpus().length
  const { SERVER_PORT = 3000 } = process.env

  cluster.setupPrimary({
    exec: process.cwd() + '/dist/app.js',
  })

  const child_process = await import('child_process')
  const child = child_process.fork('./dist/fibonacci/infrastructure/event.handler')
  child.on('message', (value: number) => {
    console.log(`[Server] Fibonacci from child process: ${value}`)
  })
  console.log(`[Server] CPU Counts: ${cpuCount}`)
  console.log(`[Server] Primary PID: ${process.pid}`)
  console.log(`[Server] Running at http://localhost:${SERVER_PORT}`)

  while (cpuCount--) cluster.fork()
  cluster.on('online', (worker) => {
    console.log(`[Worker] Online: Id ${worker.id}\tPID ${worker.process.pid}`)
    worker.on('message', (value: number) => {
      child.send(value)
    })
  })
  cluster.on('exit', (worker) => {
    console.log(`[Worker] Offline: Id ${worker.id}\tPID ${worker.process.pid}`)
    cluster.fork()
  })
})()
