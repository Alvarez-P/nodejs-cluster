import { Kafka, Producer, Consumer, Partitioners } from 'kafkajs'

export class KafkaService {
  #client: Kafka
  #producer: Producer | null = null
  #consumer: Consumer | null = null
  constructor() {
    const clientId = 'kafka-client'
    const host = process.env.KAFKA_SERVER_HOST
    const port = process.env.KAFKA_SERVER_HOST_PORT
    this.#client = new Kafka({ brokers: [`${host}:${port}`], clientId })
  }

  async publish(topic: string, content: string) {
    if (!this.#producer)
      this.#producer = this.#client.producer({
        createPartitioner: Partitioners.DefaultPartitioner,
      })
    await this.#producer.connect()
    const message = { key: 'key', value: content, partition: 0 }
    await this.#producer.send({ topic, messages: [message] })
  }

  async subscribe(topic: string) {
    if (!this.#consumer)
      this.#consumer = this.#client.consumer({ groupId: 'kafka-client' })
    await this.#consumer.connect()
    await this.#consumer.subscribe({ topic })
    await this.#consumer.run({
      eachMessage: async ({ partition, message }) => {
        console.log(`[Kafka] Queue result:`, {
          partition,
          offset: message.offset,
          value: message.value?.toString(),
        })
      },
    })
  }
}
