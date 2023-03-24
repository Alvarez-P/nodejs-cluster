import { CacheClient } from './cache'
import { KafkaService } from './kafka'
import { Middlewares } from './middlewares'

export const cacheClient = new CacheClient()
export const kafkaService = new KafkaService()
export const middlewares = new Middlewares(cacheClient)

