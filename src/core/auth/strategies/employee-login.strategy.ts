import { Injectable } from '@nestjs/common'
import { EmployeeCommandFactory } from 'src/core/employee/employee-command.factory'
import { v4 } from 'uuid'
import { LoginDTO } from '../dto/login.dto'
import { AuthTokenRepository } from '../repositories/auth-token.repository'
import { AuthToken } from '../schemas/auth-token.schema'
import { AuthStrategy } from './auth-strategy.interface'

@Injectable()
export class EmployeeLoginStrategy implements AuthStrategy<LoginDTO> {
  constructor(
    private readonly authTokenRepository: AuthTokenRepository,
    private readonly employee: EmployeeCommandFactory
  ) {}

  async login(data: LoginDTO): Promise<AuthToken> {
    const token = v4()
    const employee = await this.employee.getEmployeeById(data.id).exec()
    return await this.authTokenRepository.updateOne(
      { deviceId: data.deviceId },
      { deviceId: data.deviceId, token, employee },
      { new: true, upsert: true }
    )
  }
}
