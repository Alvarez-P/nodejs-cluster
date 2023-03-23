import { FibonacciQueueName } from '../constants'
import { FibonacciService } from '../app/fibonacci.service'
import { CacheClient } from '../../shared/infrastructure/cache'
import { QueueProducer } from '../../shared/types/queue.producer.interface'

export class FibonacciRedisProducer implements QueueProducer {
  constructor(
    private fibonacciService: FibonacciService,
    private cacheClient: CacheClient
  ) {}

  async publish(value: number) {
    try {
      const result = this.fibonacciService.execute(value)
      this.cacheClient.publish(FibonacciQueueName, JSON.stringify({ result }))
    } catch (error: unknown) {
      console.error(`[Error]`, error)
      if (error instanceof Error) process.exit()
    }
  }
}
