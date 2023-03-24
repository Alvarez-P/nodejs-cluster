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
        SERVER_PORT: 3300,
        REDIS_SERVER_HOST: 'localhost',
        REDIS_SERVER_HOST_PORT: 6379,
        KAFKA_ZOOKEEPER_CONNECT:'zookeeper:2181'
      },
      env_production: {
        NODE_ENV: 'production',
        SERVER_PORT: 3500,
        REDIS_SERVER_HOST: 'localhost',
        REDIS_SERVER_HOST_PORT: 6379,
        KAFKA_ZOOKEEPER_CONNECT:'zookeeper:2181'
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
    }
  ],
}
