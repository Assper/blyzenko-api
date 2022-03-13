import { Injectable } from '@nestjs/common'
import { filter, map, Observable, Subject } from 'rxjs'
import { Slot } from 'src/shared/interfaces/slot.interface'
import { Nullable } from 'src/shared/types/util-types'
import { EmployeeDocument } from './employee.schema'

export type EmployeeEvent = {
  type: 'get'
  employee: Nullable<EmployeeDocument>
}

@Injectable()
export class EmployeeSlot implements Slot<EmployeeEvent> {
  readonly subject$ = new Subject<EmployeeEvent>()

  get(): Observable<Nullable<EmployeeDocument>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'get'),
      map(({ employee }) => employee)
    )
  }
}
