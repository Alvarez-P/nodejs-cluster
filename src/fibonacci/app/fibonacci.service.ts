export class FibonacciService {
  constructor() {}
  public execute(value: number): number {
    if (value <= 1) return value
    else return this.execute(value - 1) + this.execute(value - 2)
  }
}
