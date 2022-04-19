import { NotFoundException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { messages } from '../messages'
import { Store } from '../store.schema'
import { StoreService } from '../store.service'
import { StoreSlot } from '../store.slot'

export class GetByIdCommand implements Command<Store> {
  constructor(
    private readonly service: StoreService,
    private readonly slot: StoreSlot,
    private readonly storeId: string
  ) {}

  async exec(): Promise<Store> {
    const store = await this.service.getById(this.storeId)
    if (!store) {
      throw new NotFoundException(messages.storeByIdNotFound(this.storeId))
    }

    this.slot.subject$.next({
      type: 'get',
      store
    })
    return store
  }
}
