import rabbit, { Channel, Connection } from 'amqplib'
import { FibonacciQueueName } from '../constants'
import { FibonacciService } from '../app/fibonacci.service'
import { QueueProducer } from '../../shared/types/queue.producer.interface'

export class FibonacciRabbitProducer implements QueueProducer {
  constructor(private fibonacciService: FibonacciService) {}

  async publish(value: number) {
    try {
      const connection: Connection = await rabbit.connect('amqp://localhost')
      const channel: Channel = await connection.createChannel()
      await channel.assertQueue(FibonacciQueueName, { durable: false })
      const result = this.fibonacciService.execute(value)
      channel.sendToQueue(FibonacciQueueName, Buffer.from(String(result)))
    } catch (error: unknown) {
      console.error(`[Error]`, error)
      if (error instanceof Error) process.exit()
    }
  }
}
