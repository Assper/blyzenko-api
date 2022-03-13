import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { EmployeeCommandFactory } from './employee-command.factory'
import { EmployeeController } from './employee.controller'
import { EmployeeRepository } from './employee.repository'
import { Employee, EmployeeSchema } from './employee.schema'
import { EmployeeService } from './employee.service'
import { EmployeeSlot } from './employee.slot'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])
  ],
  providers: [
    EmployeeRepository,
    EmployeeService,
    EmployeeCommandFactory,
    EmployeeSlot
  ],
  exports: [EmployeeCommandFactory, EmployeeSlot],
  controllers: [EmployeeController]
})
export class EmployeeModule {}
