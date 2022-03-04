import { Injectable } from '@nestjs/common'
import { EmployeeSlot } from './employee/employee.slot'
import { StoreSlot } from './store/store.slot'

@Injectable()
export class MarketSlot {
  constructor(readonly store: StoreSlot, readonly employee: EmployeeSlot) {}
}
