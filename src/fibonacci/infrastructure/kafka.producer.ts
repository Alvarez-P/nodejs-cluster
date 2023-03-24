import { FibonacciQueueName } from '../constants'
import { FibonacciService } from '../app/fibonacci.service'
import { QueueProducer } from '../../shared/types/queue.producer.interface'
import { KafkaService } from '../../shared/infrastructure/kafka'

export class FibonacciKafkaProducer implements QueueProducer {
  constructor(
    private fibonacciService: FibonacciService,
    private kafkaService: KafkaService
  ) {}

  async publish(value: number) {
    try {
      const result = this.fibonacciService.execute(value)
      this.kafkaService.publish(FibonacciQueueName, JSON.stringify({ result }))
    } catch (error: unknown) {
      console.error(`[Error]`, error)
      if (error instanceof Error) process.exit()
    }
  }
}
