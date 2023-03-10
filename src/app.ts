import express, { Express, Request, Response, Router } from 'express'
import dotenv from 'dotenv'
import fibonacciRoutes from './fibonacci/infrastructure/http.dependencies'

dotenv.config()

const app: Express = express()
const router: Router = Router()
const { SERVER_PORT = 3000 } = process.env

router.get('/', (_: Request, res: Response) => {
  res.send({ ping: 'Success' })
})
router.use(fibonacciRoutes)
app.use('/api', router)
app.listen(SERVER_PORT, () => {
  console.log(`[Server] Running at http://localhost:${SERVER_PORT}`)
})
