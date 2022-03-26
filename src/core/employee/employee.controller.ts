import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { OwnDataGuard } from 'src/shared/guards/own-data.guard'
import { IsMongoIdPipe } from 'src/shared/pipes/mongo-id.pipe'
import { EmployeeCommandFactory } from './employee-command.factory'
import { EmployeeDocument } from './employee.schema'

@Controller('employees')
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(private readonly employee: EmployeeCommandFactory) {}

  @Get(':id')
  @UseGuards(OwnDataGuard)
  getById(
    @Param('id', IsMongoIdPipe) employeeId: string
  ): Promise<EmployeeDocument> {
    const command = this.employee.getEmployeeById(employeeId)
    return command.exec()
  }
}
