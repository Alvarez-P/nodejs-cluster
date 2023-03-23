import { Request, Response, Router } from 'express'
import { FibonacciService } from '../app/fibonacci.service'
import { FibonacciQueueProducer } from './queue.producer'
import { middlewares } from '../../shared/infrastructure'
import { CacheClient } from '../../shared/infrastructure/cache'

export class FibonacciController {
  constructor(
    private readonly fibonacciService: FibonacciService,
    private readonly fibonacciQueueProducer: FibonacciQueueProducer,
    private readonly cacheClient: CacheClient
  ) {}

  async calcFibonacci(req: Request, res: Response) {
    console.log(`[Worker] New request managed by PID ${process.pid}`)
    const result = this.fibonacciService.execute(+req.query.number!)
    await this.cacheClient.setValue(req.originalUrl, JSON.stringify({ result }))
    res.json({ result })
  }
  calcFibonacciEvent(req: Request, res: Response) {
    console.log(`[Worker] New request managed by PID ${process.pid}`)
    process.send!(req.query.number!)
    res.end()
  }
  calcFibonacciQueue(req: Request, res: Response) {
    console.log(`[Worker] New request managed by PID ${process.pid}`)
    this.fibonacciQueueProducer.produce(+req.query.number!)
    res.end()
  }

  public routes(): Router {
    const router: Router = Router()
    router.get('/', middlewares.cache, this.calcFibonacci.bind(this))
    router.get('/event', middlewares.cache, this.calcFibonacciEvent)
    router.get('/queue', middlewares.cache, this.calcFibonacciQueue.bind(this))
    return router
  }
}
