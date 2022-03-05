import { Injectable } from '@nestjs/common'
import { AuthTokenRepository } from './repositories/auth-token.repository'
import { AuthTokenDocument } from './schemas/auth-token.schema'
import { AuthStrategy } from './strategies/auth-strategy.interface'

@Injectable()
export class AuthService {
  constructor(private readonly authTokenRepository: AuthTokenRepository) {}

  async login<T>(
    data: T,
    strategy: AuthStrategy<T>
  ): Promise<AuthTokenDocument> {
    return await strategy.login(data)
  }

  async getToken(token: string): Promise<AuthTokenDocument> {
    return await this.authTokenRepository.findOne({ token })
  }
}
