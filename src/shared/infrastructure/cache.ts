import { RedisClientType, createClient } from 'redis'

export class CacheClient {
  #client: RedisClientType
  constructor() {
    const host = process.env.REDIS_SERVER_HOST
    const port = process.env.REDIS_SERVER_HOST_PORT
    this.#client = createClient({ url: `redis://${host}:${port}/0` })
  }

  async setValue(key: string, value: string) {
    await this.#client.connect()
    await this.#client.set(key, value)
    return this.#client.quit()
  }

  async getValue(key: string) {
    await this.#client.connect()
    const result = await this.#client.get(key)
    await this.#client.quit()
    return result
  }

  async publish(channel: string, content: string) {
    await this.#client.connect()
    const result = await this.#client.publish(channel, content)
    await this.#client.quit()
    return result
  }

  async subscribe(channel: string) {
    await this.#client.connect()
    const result = await this.#client.subscribe(channel, (message: string) => {
      console.log(`[Redis] Queue result: ${message}`)
    })
    return result
  }

  async quit() {
    return this.#client.quit()
  }
}
