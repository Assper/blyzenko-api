import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { IsMongoIdPipe } from 'src/shared/pipes/mongo-id.pipe'
import { StoreCommandFactory } from './store-command.factory'
import { StoreDocument } from './store.schema'

@Controller('stores')
@UseGuards(AuthGuard)
export class StoreController {
  constructor(private readonly store: StoreCommandFactory) {}

  @Get(':id')
  getById(@Param('id', IsMongoIdPipe) storeId: string): Promise<StoreDocument> {
    const command = this.store.getStoreById(storeId)
    return command.exec()
  }
}
