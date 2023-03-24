import { FibonacciQueueName } from '../constants'
import { KafkaService } from '../../shared/infrastructure/kafka'
;(async () => {
  const kafkaService: KafkaService = new KafkaService()
  try {
    kafkaService.subscribe(FibonacciQueueName)
  } catch (error: unknown) {
    console.error(`[Error]`, error)
    if (error instanceof Error) process.exit()
  }
})()
