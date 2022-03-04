export class EnvError extends Error {
  constructor(message: string) {
    super(message)
    this.message = `Enviroment error: ${this.message}`
  }
}
