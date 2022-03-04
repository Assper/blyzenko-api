import { Injectable } from '@nestjs/common'
import { filter, map, Observable, Subject } from 'rxjs'
import { Slot } from 'src/shared/interfaces/slot.interface'
import { MarketStore } from './store.service'

export type MarketStoreEvent = {
  type: 'get'
  stores: MarketStore[]
}

@Injectable()
export class StoreSlot implements Slot<MarketStoreEvent> {
  readonly subject$ = new Subject<MarketStoreEvent>()

  getStores(): Observable<MarketStore[]> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'get'),
      map(({ stores }) => stores)
    )
  }
}
