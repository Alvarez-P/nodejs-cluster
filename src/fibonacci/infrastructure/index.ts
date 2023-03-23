import { cacheClient } from '../../shared/infrastructure'
import { FibonacciService } from '../app/fibonacci.service'
import { FibonacciController } from './http.controller'
import { FibonacciQueueProducer } from './queue.producer'

const fibonacciService = new FibonacciService()
const fibonacciQueueHandler = new FibonacciQueueProducer(fibonacciService)
const fibonacciController = new FibonacciController(
  fibonacciService,
  fibonacciQueueHandler,
  cacheClient
)

export default fibonacciController.routes()
