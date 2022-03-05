import { Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthSlot } from './auth.slot'
import { GetAuthTokenCommand } from './commands/get-auth-token.command'
import { LoginCommand } from './commands/login.command'
import { LoginDTO } from './dto/login.dto'
import { SuperUserLoginStrategy } from './strategies/super-user-login.strategy'

@Injectable()
export class AuthCommandFactory {
  constructor(
    private readonly service: AuthService,
    private readonly slot: AuthSlot,
    private readonly superUserLogin: SuperUserLoginStrategy
  ) {}

  login(data: LoginDTO): LoginCommand {
    const strategies = {
      superUser: this.superUserLogin
    }
    return new LoginCommand(this.service, this.slot, strategies, data)
  }

  getAuthToken(token: string): GetAuthTokenCommand {
    return new GetAuthTokenCommand(this.service, this.slot, token)
  }
}
