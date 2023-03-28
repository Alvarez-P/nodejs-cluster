const dotenv = require('dotenv')

dotenv.config()
module.exports = {
  apps: [
    {
      script: __dirname + '/dist/app.js',
      watch: '.',
      instances: 'MAX',
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
        SERVER_PORT: process.env.SERVER_PORT,
        REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST,
        REDIS_SERVER_HOST_PORT: process.env.REDIS_SERVER_HOST_PORT,
        KAFKA_ZOOKEEPER_CONNECT: process.env.KAFKA_ZOOKEEPER_CONNECT,
        KAFKA_SERVER_HOST: process.env.KAFKA_SERVER_HOST,
        KAFKA_SERVER_HOST_PORT: process.env.KAFKA_SERVER_HOST_PORT,
      },
      env_production: {
        NODE_ENV: 'production',
        SERVER_PORT: process.env.SERVER_PORT,
        REDIS_SERVER_HOST: process.env.REDIS_SERVER_HOST,
        REDIS_SERVER_HOST_PORT: process.env.REDIS_SERVER_HOST_PORT,
        KAFKA_ZOOKEEPER_CONNECT: process.env.KAFKA_ZOOKEEPER_CONNECT,
        KAFKA_SERVER_HOST: process.env.KAFKA_SERVER_HOST,
        KAFKA_SERVER_HOST_PORT: process.env.KAFKA_SERVER_HOST_PORT,
        RABBITMQ_SERVER_HOST: process.env.RABBITMQ_SERVER_HOST,
      },
    },
    {
      name: 'WorkerFibonacciRabbitConsumer',
      script: __dirname + '/dist/fibonacci/infrastructure/queue.consumer.js',
      instances: 1,
    },
    {
      name: 'WorkerFibonacciRedisConsumer',
      script: __dirname + '/dist/fibonacci/infrastructure/redis.consumer.js',
      instances: 1,
    },
    {
      name: 'WorkerFibonacciKafkaConsumer',
      script: __dirname + '/dist/fibonacci/infrastructure/kafka.consumer.js',
      instances: 1,
    },
  ],
}
