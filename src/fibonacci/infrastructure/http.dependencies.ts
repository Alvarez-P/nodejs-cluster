import { FibonacciService } from '../app/fibonacci.service'
import { FibonacciController } from './http.controller'

const fibonacciService = new FibonacciService()
const fibonacciController = new FibonacciController(fibonacciService)

export default fibonacciController.routes()
