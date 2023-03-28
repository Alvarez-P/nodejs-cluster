import { NextFunction, Request, Response } from 'express'
import { CacheClient } from './cache'

export class Middlewares {
  constructor(private readonly cacheClient: CacheClient) {
    this.cache = this.cache.bind(this)
  }

  async cache(req: Request, res: Response, next: NextFunction) {
    const result = await this.cacheClient.getValue(req.originalUrl)
    console.log(`[Worker] Verifying cache ${req.originalUrl} => ${result}`)
    if (result) return res.send(JSON.parse(result))
    next()
  }

  error (err: Error, _req: Request, res: Response, _next: NextFunction) {
    console.log(`[Worker] Error`, err)
    res.json(err)
  }
}
