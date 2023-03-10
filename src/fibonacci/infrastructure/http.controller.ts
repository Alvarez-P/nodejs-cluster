import { Request, Response, Router } from 'express'
import { FibonacciService } from '../app/fibonacci.service'

export class FibonacciController {
  constructor(private readonly fibonacciService: FibonacciService) {}

  calcFibonacci(req: Request, res: Response) {
    const result = this.fibonacciService.execute(+req.query.number!)
    res.json({ result })
  }

  public routes(): Router {
    const router: Router = Router()
    router.get('/fibonacci', this.calcFibonacci.bind(this))
    return router
  }
}
