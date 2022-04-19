import { Injectable, UnauthorizedException } from '@nestjs/common'
import { SuperUserConfig } from 'src/config/super-user.config'
import { LoggerService } from 'src/core/logger/logger.service'
import { v4 } from 'uuid'
import { LoginDTO } from '../dto/login.dto'
import { messages } from '../messages'
import { AuthTokenRepository } from '../repositories/auth-token.repository'
import { AuthToken } from '../schemas/auth-token.schema'
import { AuthStrategy } from './auth-strategy.interface'

@Injectable()
export class SuperUserLoginStrategy implements AuthStrategy<LoginDTO> {
  constructor(
    private readonly config: SuperUserConfig,
    private readonly logger: LoggerService,
    private readonly authTokenRepository: AuthTokenRepository
  ) {}

  private validate(data: LoginDTO): void {
    const { login, password } = this.config
    if (login !== data.phone || password !== data.password) {
      this.logger.error(
        `SuperUserLoginStrategy - Invalid Creds: ${data.phone} ${data.password}`
      )
      throw new UnauthorizedException(messages.invalidCreds())
    }
  }

  async login(data: LoginDTO): Promise<AuthToken> {
    this.validate(data)
    const token = v4()
    return await this.authTokenRepository.updateOne(
      { deviceId: data.deviceId },
      { deviceId: data.deviceId, token },
      { new: true, upsert: true }
    )
  }
}
