import { RedisClientType, createClient } from 'redis'

export class CacheClient {
  #client: RedisClientType
  constructor() {
    this.#client = createClient()
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
}
