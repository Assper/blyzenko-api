import { Injectable } from '@nestjs/common'
import { filter, map, Observable, Subject } from 'rxjs'
import { Slot } from 'src/shared/interfaces/slot.interface'
import { Nullable } from 'src/shared/types/util-types'
import { Store } from './store.schema'

export type StoreEvent = {
  type: 'get'
  store: Nullable<Store>
}

@Injectable()
export class StoreSlot implements Slot<StoreEvent> {
  readonly subject$ = new Subject<StoreEvent>()

  get(): Observable<Nullable<Store>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'get'),
      map(({ store }) => store)
    )
  }
}
