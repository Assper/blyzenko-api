import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from 'src/config/config.module'
import { LoggerModule } from 'src/core/logger/logger.module'
import { EmployeeCommandFactory } from './employee-command.factory'
import { EmployeeService } from './employee.service'
import { EmployeeSlot } from './employee.slot'

@Module({
  imports: [HttpModule, LoggerModule, ConfigModule],
  providers: [EmployeeSlot, EmployeeService, EmployeeCommandFactory],
  exports: [EmployeeCommandFactory, EmployeeSlot]
})
export class EmployeeModule {}
