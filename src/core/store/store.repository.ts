import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import { Store, StoreDocument } from './store.schema'

@Injectable()
export class StoreRepository extends Repository<StoreDocument> {
  constructor(
    @InjectModel(Store.name)
    protected readonly model: Model<StoreDocument>
  ) {
    super()
    this.model.syncIndexes()
  }
}
