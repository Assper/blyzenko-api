import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { StoreRepository } from './store.repository'
import { Store, StoreSchema } from './store.schema'
import { StoreService } from './store.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }])
  ],
  providers: [StoreRepository, StoreService],
  exports: []
})
export class StoreModule {}
