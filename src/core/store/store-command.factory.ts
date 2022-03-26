import { Injectable } from '@nestjs/common'
import { GetByIdCommand } from './commands/get-by-id.command'
import { StoreService } from './store.service'
import { StoreSlot } from './store.slot'

@Injectable()
export class StoreCommandFactory {
  constructor(
    private readonly storeService: StoreService,
    private readonly slot: StoreSlot
  ) {}

  getStoreById(id: string): GetByIdCommand {
    return new GetByIdCommand(this.storeService, this.slot, id)
  }
}
