import { cacheClient, kafkaService } from '../../shared/infrastructure'
import { FibonacciService } from '../app/fibonacci.service'
import { FibonacciController } from './http.controller'
import { FibonacciKafkaProducer } from './kafka.producer'
import { FibonacciRabbitProducer } from './rabbitmq.producer'
import { FibonacciRedisProducer } from './redis.producer'

const fibonacciService = new FibonacciService()

const fibonacciRabbitHandler = new FibonacciRabbitProducer(fibonacciService)
const fibonacciRedisHandler = new FibonacciRedisProducer(
  fibonacciService,
  cacheClient
)
const fibonacciKafkaHandler = new FibonacciKafkaProducer(
  fibonacciService,
  kafkaService
)

const fibonacciController = new FibonacciController(
  fibonacciService,
  fibonacciRabbitHandler,
  cacheClient
)

export default fibonacciController.routes()
