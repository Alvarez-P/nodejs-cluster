import { cacheClient } from '../../shared/infrastructure'
import { FibonacciService } from '../app/fibonacci.service'
import { FibonacciController } from './http.controller'
import { FibonacciRabbitProducer } from './rabbitmq.producer'
import { FibonacciRedisProducer } from './redis.producer'

const fibonacciService = new FibonacciService()

const fibonacciRabbitHandler = new FibonacciRabbitProducer(fibonacciService)
const fibonacciRedisHandler = new FibonacciRedisProducer(
  fibonacciService,
  cacheClient
)

const fibonacciController = new FibonacciController(
  fibonacciService,
  fibonacciRedisHandler,
  cacheClient
)

export default fibonacciController.routes()
