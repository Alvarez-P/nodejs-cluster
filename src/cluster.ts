import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'

dotenv.config()

let cpuCount = os.cpus().length
const { SERVER_PORT = 3000 } = process.env

cluster.setupPrimary({
  exec: process.cwd() + '/dist/app.js',
})

console.log(`[Server] CPU Counts: ${cpuCount}`)
console.log(`[Server] Primary PID: ${process.pid}`)
console.log(`[Server] Running at http://localhost:${SERVER_PORT}`)

while (cpuCount--) cluster.fork()
cluster.on('online', (worker) => {
  console.log(`[Worker] Online: Id ${worker.id}\tPID ${worker.process.pid}`)
})
cluster.on('exit', (worker) => {
  console.log(`[Worker] Offline: Id ${worker.id}\tPID ${worker.process.pid}`)
  cluster.fork()
})
