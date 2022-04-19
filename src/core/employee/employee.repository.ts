import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import { Employee } from './employee.schema'

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  constructor(
    @InjectModel(Employee.name)
    protected readonly model: Model<Employee>
  ) {
    super()
    this.model.syncIndexes()
  }
}
