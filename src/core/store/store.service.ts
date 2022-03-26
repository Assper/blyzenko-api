import { Injectable } from '@nestjs/common'
import { Service } from 'src/shared/abstract/service.abstract'
import { StoreRepository } from './store.repository'
import { StoreDocument } from './store.schema'

@Injectable()
export class StoreService extends Service<StoreRepository, StoreDocument> {
  constructor(protected readonly repository: StoreRepository) {
    super()
  }
}
