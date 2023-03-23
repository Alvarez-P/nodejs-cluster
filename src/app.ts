import express, { Express, Request, Response, Router } from 'express'
import fibonacciRouter from './fibonacci/infrastructure'
import dotenv from 'dotenv'
import { middlewares } from './shared/infrastructure'

dotenv.config()
const app: Express = express()
const router: Router = Router()
const { SERVER_PORT = 3000 } = process.env

router.get('/', (_: Request, res: Response) => {
  res.send({ ping: 'Success' })
})
router.use('/fibonacci', fibonacciRouter)
app.use('/api', router)
app.use(middlewares.error)
app.listen(SERVER_PORT)
