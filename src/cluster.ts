import cluster from 'cluster'
import os from 'os'

let cpuCount = os.cpus().length

console.log(`[Server] CPU Counts: ${cpuCount}`)
console.log(`Primary pid=${process.pid}`)

cluster.setupPrimary({
  exec: process.cwd() + '/dist/app.js',
})
while (cpuCount--) cluster.fork()
cluster.on('online', (worker) => {
  console.log(`[Worker] Online: Id ${worker.id}\tPID ${worker.process.pid}`)
})
cluster.on('exit', (worker) => {
  console.log(`[Worker] Offline: Id ${worker.id}\tPID ${worker.process.pid}`)
  cluster.fork()
})
