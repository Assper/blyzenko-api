import { Injectable } from '@nestjs/common'
import { CreateConfirmDTO } from './dto/create-confirm.dto'
import { AuthTokenRepository } from './repositories/auth-token.repository'
import { ConfirmTokenRepository } from './repositories/confirm-token.repository'
import { AuthToken } from './schemas/auth-token.schema'
import { ConfirmToken } from './schemas/confirm-token.schema'
import { AuthStrategy } from './strategies/auth-strategy.interface'

@Injectable()
export class AuthService {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly confirmTokenRepository: ConfirmTokenRepository
  ) {}

  private genConfirmToken(min = 1000, max = 9999): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  async login<T>(data: T, strategy: AuthStrategy<T>): Promise<AuthToken> {
    return await strategy.login(data)
  }

  async getToken(token: string): Promise<AuthToken> {
    return await this.authTokenRepository.findOne({ token })
  }

  async removeToken(token: string): Promise<AuthToken> {
    return await this.authTokenRepository.deleteOne({ token }, { new: true })
  }

  async createConfirm(data: CreateConfirmDTO): Promise<ConfirmToken> {
    const token = this.genConfirmToken()
    return await this.confirmTokenRepository.updateOne(
      { phone: data.phone, deviceId: data.deviceId },
      { ...data, token },
      { new: true, upsert: true }
    )
  }
}
