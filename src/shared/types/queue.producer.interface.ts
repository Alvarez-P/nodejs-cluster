export interface QueueProducer {
  publish(value: number): Promise<void>
}
