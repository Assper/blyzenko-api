import { Subject } from 'rxjs'

export interface Slot<T> {
  readonly subject$: Subject<T>
}
