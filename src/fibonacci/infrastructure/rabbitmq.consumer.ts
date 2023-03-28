import rabbit, { Channel, Connection, ConsumeMessage } from 'amqplib'
import { FibonacciQueueName } from '../constants'

;(async () => {
  try {
    const host = process.env.RABBITMQ_SERVER_HOST
    const connection: Connection = await rabbit.connect(`amqp://${host}`)
    const channel: Channel = await connection.createChannel()
    await channel.assertQueue(FibonacciQueueName, { durable: false })
    channel.consume(
      FibonacciQueueName,
      (message: ConsumeMessage | null) => {
        console.log(`[RabbitMQ] Queue result: ${message?.content}`)
      },
      { noAck: true }
    )
  } catch (error: unknown) {
    console.error(`[Error]`, error)
    if (error instanceof Error) process.exit()
  }
})()
