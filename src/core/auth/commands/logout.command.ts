import { NotFoundException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { AuthService } from '../auth.service'
import { AuthSlot } from '../auth.slot'
import { messages } from '../messages'
import { AuthTokenDocument } from '../schemas/auth-token.schema'

export class LogoutCommand implements Command<AuthTokenDocument> {
  constructor(
    private readonly service: AuthService,
    private readonly slot: AuthSlot,
    private readonly token: string
  ) {}

  async exec(): Promise<AuthTokenDocument> {
    const token = await this.service.removeToken(this.token)
    if (!token) {
      throw new NotFoundException(messages.authNotFound())
    }

    this.slot.subject$.next({
      type: 'logout',
      token
    })
    return token
  }
}
