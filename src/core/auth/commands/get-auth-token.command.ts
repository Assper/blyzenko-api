import { Command } from 'src/shared/interfaces/command.interface'
import { AuthService } from '../auth.service'
import { AuthSlot } from '../auth.slot'
import { AuthToken } from '../schemas/auth-token.schema'

export class GetAuthTokenCommand implements Command<AuthToken> {
  constructor(
    private readonly service: AuthService,
    private readonly slot: AuthSlot,
    private readonly token: string
  ) {}

  async exec(): Promise<AuthToken> {
    const token = await this.service.getToken(this.token)
    this.slot.subject$.next({
      type: 'get',
      token
    })
    return token
  }
}
