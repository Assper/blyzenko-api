import { AuthTokenDocument } from '../schemas/auth-token.schema'

export interface AuthStrategy<T> {
  login(data: T): AuthTokenDocument | Promise<AuthTokenDocument>
}
