import { Injectable } from '@nestjs/common'
import { filter, map, Observable, Subject } from 'rxjs'
import { Slot } from 'src/shared/interfaces/slot.interface'
import { Nullable } from 'src/shared/types/util-types'
import { Employee } from './employee.schema'

export type EmployeeEvent = {
  type: 'get'
  employee: Nullable<Employee>
}

@Injectable()
export class EmployeeSlot implements Slot<EmployeeEvent> {
  readonly subject$ = new Subject<EmployeeEvent>()

  get(): Observable<Nullable<Employee>> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'get'),
      map(({ employee }) => employee)
    )
  }
}
