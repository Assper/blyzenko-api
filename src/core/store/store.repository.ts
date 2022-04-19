import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import { Store } from './store.schema'

@Injectable()
export class StoreRepository extends Repository<Store> {
  constructor(
    @InjectModel(Store.name)
    protected readonly model: Model<Store>
  ) {
    super()
    this.model.syncIndexes()
  }
}
