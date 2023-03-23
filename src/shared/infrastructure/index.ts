import { CacheClient } from './cache'
import { Middlewares } from './middlewares'

export const cacheClient = new CacheClient()
export const middlewares = new Middlewares(cacheClient)

