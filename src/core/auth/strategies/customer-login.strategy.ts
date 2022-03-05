import { Injectable, UnauthorizedException } from '@nestjs/common'
import { LoggerService } from 'src/core/logger/logger.service'
import { UserCommandFactory } from 'src/core/user/user-command.factory'
import { v4 } from 'uuid'
import { LoginDTO } from '../dto/login.dto'
import { messages } from '../messages'
import { AuthTokenRepository } from '../repositories/auth-token.repository'
import { ConfirmTokenRepository } from '../repositories/confirm-token.repository'
import { AuthTokenDocument } from '../schemas/auth-token.schema'
import { AuthStrategy } from './auth-strategy.interface'

@Injectable()
export class CustomerLoginStrategy implements AuthStrategy<LoginDTO> {
  constructor(
    private readonly logger: LoggerService,
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly confirmTokenRepository: ConfirmTokenRepository,
    private readonly user: UserCommandFactory
  ) {}

  private async validate({
    phone,
    confirm,
    deviceId
  }: LoginDTO): Promise<void> {
    const token = await this.confirmTokenRepository.deleteOne(
      { deviceId, phone, token: confirm },
      { new: true }
    )
    if (!token) {
      this.logger.error(
        `CustomerLoginStrategy - Confirm Token Not Found: ${phone} ${confirm} ${deviceId}`
      )
      throw new UnauthorizedException(messages.confirmNotFound())
    }
  }

  async login(data: LoginDTO): Promise<AuthTokenDocument> {
    await this.validate(data)
    const token = v4()
    const user = await this.user.getUserByPhone(data.phone).exec()
    return await this.authTokenRepository.updateOne(
      { deviceId: data.deviceId },
      { deviceId: data.deviceId, token, user },
      { new: true, upsert: true }
    )
  }
}
