import { Injectable } from '@nestjs/common'
import { filter, map, Observable, Subject } from 'rxjs'
import { Slot } from 'src/shared/interfaces/slot.interface'
import { Nullable } from 'src/shared/types/util-types'
import { UserDocument } from './user.schema'

export type UserEvent = {
  type: 'get-by-id'
  user: Nullable<UserDocument>
}

@Injectable()
export class UserSlot implements Slot<UserEvent> {
  readonly subject$ = new Subject<UserEvent>()

  getUserById(): Observable<Nullable<UserDocument>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'get-by-id'),
      map(({ user }) => user)
    )
  }
}
