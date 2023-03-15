import { FibonacciService } from '../app/fibonacci.service'

process.on('message', (value: number) => {
  const fibonacciService = new FibonacciService()
  console.log(`[Worker] New request managed by PID ${process.pid}`)
  process.send!(fibonacciService.execute(value))
})
