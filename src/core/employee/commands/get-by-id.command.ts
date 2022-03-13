import { NotFoundException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { messages } from '../messages'
import { EmployeeDocument } from '../employee.schema'
import { EmployeeService } from '../employee.service'
import { EmployeeSlot } from '../employee.slot'

export class GetByIdCommand implements Command<EmployeeDocument> {
  constructor(
    private readonly service: EmployeeService,
    private readonly slot: EmployeeSlot,
    private readonly employeeId: string
  ) {}

  async exec(): Promise<EmployeeDocument> {
    const employee = await this.service.getById(this.employeeId)
    if (!employee) {
      throw new NotFoundException(
        messages.employeeByIdNotFound(this.employeeId)
      )
    }

    this.slot.subject$.next({
      type: 'get',
      employee
    })
    return employee
  }
}
