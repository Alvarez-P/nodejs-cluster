import { Request, Response, Router } from 'express'
import { FibonacciService } from '../app/fibonacci.service'

export class FibonacciController {
  constructor(private readonly fibonacciService: FibonacciService) {}

  calcFibonacci(req: Request, res: Response) {
    console.log(`[Worker] New request managed by PID ${process.pid}`)
    const result = this.fibonacciService.execute(+req.query.number!)
    res.json({ result })
  }
  calcFibonacciEvent(req: Request, res: Response) {
    console.log(`[Worker] New request managed by PID ${process.pid}`)
    process.send!(req.query.number!)
    res.end()
  }

  public routes(): Router {
    const router: Router = Router()
    router.get('/', this.calcFibonacci.bind(this))
    router.get('/event', this.calcFibonacciEvent)
    return router
  }
}
