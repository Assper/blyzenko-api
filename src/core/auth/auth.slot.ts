import { Injectable } from '@nestjs/common'
import { filter, map, Observable, Subject } from 'rxjs'
import { Slot } from 'src/shared/interfaces/slot.interface'
import { Nullable } from 'src/shared/types/util-types'
import { AuthTokenDocument } from './schemas/auth-token.schema'
import { ConfirmTokenDocument } from './schemas/confirm-token.schema'

export type AuthEvent = {
  type: 'login' | 'logout' | 'confirm' | 'get'
  token?: Nullable<AuthTokenDocument>
  confirm?: Nullable<ConfirmTokenDocument>
}

@Injectable()
export class AuthSlot implements Slot<AuthEvent> {
  readonly subject$ = new Subject<AuthEvent>()

  login(): Observable<Nullable<AuthTokenDocument>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'login'),
      map(({ token }) => token)
    )
  }

  get(): Observable<Nullable<AuthTokenDocument>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'get'),
      map(({ token }) => token)
    )
  }

  logout(): Observable<Nullable<AuthTokenDocument>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'logout'),
      map(({ token }) => token)
    )
  }

  confirm(): Observable<Nullable<ConfirmTokenDocument>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'confirm'),
      map(({ confirm }) => confirm)
    )
  }
}
