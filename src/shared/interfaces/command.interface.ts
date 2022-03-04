export interface Command<T> {
  exec(): T | Promise<T>
}
