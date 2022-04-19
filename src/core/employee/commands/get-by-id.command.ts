import { NotFoundException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { Employee } from '../employee.schema'
import { EmployeeService } from '../employee.service'
import { EmployeeSlot } from '../employee.slot'
import { messages } from '../messages'

export class GetByIdCommand implements Command<Employee> {
  constructor(
    private readonly service: EmployeeService,
    private readonly slot: EmployeeSlot,
    private readonly employeeId: string
  ) {}

  async exec(): Promise<Employee> {
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
