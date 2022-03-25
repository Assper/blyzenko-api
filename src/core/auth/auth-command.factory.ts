import { Injectable } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthSlot } from './auth.slot'
import { CreateConfirmCommand } from './commands/create-confirm.command'
import { GetAuthTokenCommand } from './commands/get-auth-token.command'
import { LoginCommand } from './commands/login.command'
import { LogoutCommand } from './commands/logout.command'
import { CreateConfirmDTO } from './dto/create-confirm.dto'
import { LoginDTO } from './dto/login.dto'
import { CustomerLoginStrategy } from './strategies/customer-login.strategy'
import { EmployeeLoginStrategy } from './strategies/employee-login.strategy'
import { SuperUserLoginStrategy } from './strategies/super-user-login.strategy'

@Injectable()
export class AuthCommandFactory {
  constructor(
    private readonly service: AuthService,
    private readonly slot: AuthSlot,
    private readonly superUserLogin: SuperUserLoginStrategy,
    private readonly customerLogin: CustomerLoginStrategy,
    private readonly employeeLogin: EmployeeLoginStrategy
  ) {}

  login(data: LoginDTO): LoginCommand {
    const strategies = {
      superUser: this.superUserLogin,
      customer: this.customerLogin,
      employee: this.employeeLogin
    }
    return new LoginCommand(this.service, this.slot, strategies, data)
  }

  logout(token: string): LogoutCommand {
    return new LogoutCommand(this.service, this.slot, token)
  }

  getAuthToken(token: string): GetAuthTokenCommand {
    return new GetAuthTokenCommand(this.service, this.slot, token)
  }

  createConfirmToken(data: CreateConfirmDTO): CreateConfirmCommand {
    return new CreateConfirmCommand(this.service, this.slot, data)
  }
}
