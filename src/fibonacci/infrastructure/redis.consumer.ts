import { FibonacciQueueName } from '../constants'
import { CacheClient } from '../../shared/infrastructure/cache'

;(async () => {
  const client: CacheClient = new CacheClient()
  try {
    client.subscribe(FibonacciQueueName)
  } catch (error: unknown) {
    client.quit()
    console.error(`[Error]`, error)
    if (error instanceof Error) process.exit()
  }
})()
