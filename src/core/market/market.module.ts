import { Module } from '@nestjs/common'
import { EmployeeModule } from './employee/employee.module'
import { MarketCommandFactory } from './market-command.factory'
import { MarketSlot } from './market.slot'
import { StoreModule } from './store/store.module'

@Module({
  imports: [StoreModule, EmployeeModule],
  providers: [MarketCommandFactory, MarketSlot],
  exports: [MarketCommandFactory, MarketSlot]
})
export class MarketModule {}
