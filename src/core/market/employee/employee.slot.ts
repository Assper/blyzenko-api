import { Injectable } from '@nestjs/common'
import { filter, map, Observable, Subject } from 'rxjs'
import { Slot } from 'src/shared/interfaces/slot.interface'
import { MarketEmployee } from './employee.service'

export type MarketEmployeeEvent = {
  type: 'get'
  employees: MarketEmployee[]
}

@Injectable()
export class EmployeeSlot implements Slot<MarketEmployeeEvent> {
  readonly subject$ = new Subject<MarketEmployeeEvent>()

  getEmployees(): Observable<MarketEmployee[]> {
    return this.subject$.pipe(
      filter(({ type }) => type === 'get'),
      map(({ employees }) => employees)
    )
  }
}
