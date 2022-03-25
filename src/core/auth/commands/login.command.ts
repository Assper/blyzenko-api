import { NotImplementedException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { AuthService } from '../auth.service'
import { AuthSlot } from '../auth.slot'
import { LoginDTO } from '../dto/login.dto'
import { messages } from '../messages'
import { AuthTokenDocument } from '../schemas/auth-token.schema'
import { AuthStrategy } from '../strategies/auth-strategy.interface'
import { CustomerLoginStrategy } from '../strategies/customer-login.strategy'
import { EmployeeLoginStrategy } from '../strategies/employee-login.strategy'
import { SuperUserLoginStrategy } from '../strategies/super-user-login.strategy'

type AuthStrategies = {
  superUser: SuperUserLoginStrategy
  customer: CustomerLoginStrategy
  employee: EmployeeLoginStrategy
}

export class LoginCommand implements Command<AuthTokenDocument> {
  constructor(
    private readonly service: AuthService,
    private readonly slot: AuthSlot,
    private readonly strategies: AuthStrategies,
    private readonly data: LoginDTO
  ) {}

  private getStrategy(): AuthStrategy<LoginDTO> {
    if (this.data.password) {
      return this.strategies.superUser
    }

    if (this.data.phone && this.data.confirm) {
      return this.strategies.customer
    }

    if (this.data.id) {
      return this.strategies.employee
    }

    throw new NotImplementedException(messages.authNotImplemented())
  }

  async exec(): Promise<AuthTokenDocument> {
    const strategy = this.getStrategy()
    const token = await this.service.login(this.data, strategy)
    this.slot.subject$.next({
      type: 'login',
      token
    })
    return token
  }
}
