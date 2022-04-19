import { AuthToken } from '../schemas/auth-token.schema'

export interface AuthStrategy<T> {
  login(data: T): AuthToken | Promise<AuthToken>
}
