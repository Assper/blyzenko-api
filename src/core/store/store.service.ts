import { Injectable } from '@nestjs/common'
import { Service } from 'src/shared/abstract/service.abstract'
import { StoreRepository } from './store.repository'
import { Store } from './store.schema'

@Injectable()
export class StoreService extends Service<StoreRepository, Store> {
  constructor(protected readonly repository: StoreRepository) {
    super()
  }
}
