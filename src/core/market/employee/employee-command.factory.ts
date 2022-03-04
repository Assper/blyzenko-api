import { Injectable } from '@nestjs/common'
import { LoggerService } from 'src/core/logger/logger.service'
import { EmployeeService } from './employee.service'
import { EmployeeSlot } from './employee.slot'
import { GetEmployeesCommand } from './get-employees.command'

@Injectable()
export class EmployeeCommandFactory {
  constructor(
    private readonly service: EmployeeService,
    private readonly slot: EmployeeSlot,
    private readonly logger: LoggerService
  ) {}

  getEmployees(): GetEmployeesCommand {
    return new GetEmployeesCommand(this.service, this.slot, this.logger)
  }
}
