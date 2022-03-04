import { Injectable } from '@nestjs/common'
import { LoggerService } from 'src/core/logger/logger.service'
import { StoreService } from './store.service'
import { StoreSlot } from './store.slot'
import { GetStoresCommand } from './get-stores.command'

@Injectable()
export class StoreCommandFactory {
  constructor(
    private readonly service: StoreService,
    private readonly slot: StoreSlot,
    private readonly logger: LoggerService
  ) {}

  getStores(): GetStoresCommand {
    return new GetStoresCommand(this.service, this.slot, this.logger)
  }
}
