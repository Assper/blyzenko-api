import { Injectable } from '@nestjs/common'
import { Service } from 'src/shared/abstract/service.abstract'
import { EmployeeRepository } from './employee.repository'
import { Employee } from './employee.schema'

@Injectable()
export class EmployeeService extends Service<EmployeeRepository, Employee> {
  constructor(protected readonly repository: EmployeeRepository) {
    super()
  }
}
