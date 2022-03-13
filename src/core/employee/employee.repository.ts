import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import { Employee, EmployeeDocument } from './employee.schema'

@Injectable()
export class EmployeeRepository extends Repository<EmployeeDocument> {
  constructor(
    @InjectModel(Employee.name)
    protected readonly model: Model<EmployeeDocument>
  ) {
    super()
    this.model.syncIndexes()
  }
}
