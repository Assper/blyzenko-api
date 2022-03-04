export class MarketError extends Error {
  constructor(message: string) {
    super(message)
    this.message = `Market error: ${this.message}`
  }
}
