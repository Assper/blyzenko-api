import { Injectable } from '@nestjs/common'
import { EmployeeCommandFactory } from './employee/employee-command.factory'
import { GetEmployeesCommand } from './employee/get-employees.command'
import { GetStoresCommand } from './store/get-stores.command'
import { StoreCommandFactory } from './store/store-command.factory'

@Injectable()
export class MarketCommandFactory {
  constructor(
    private readonly store: StoreCommandFactory,
    private readonly employee: EmployeeCommandFactory
  ) {}

  getStores(): GetStoresCommand {
    return this.store.getStores()
  }

  getEmployees(): GetEmployeesCommand {
    return this.employee.getEmployees()
  }
}
