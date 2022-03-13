import { Injectable } from '@nestjs/common'
import { GetByIdCommand } from './commands/get-by-id.command'
import { EmployeeService } from './employee.service'
import { EmployeeSlot } from './employee.slot'

@Injectable()
export class EmployeeCommandFactory {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly slot: EmployeeSlot
  ) {}

  getEmployeeById(id: string): GetByIdCommand {
    return new GetByIdCommand(this.employeeService, this.slot, id)
  }
}
