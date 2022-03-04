import { catchError, firstValueFrom, tap, throwError } from 'rxjs'
import { LoggerService } from 'src/core/logger/logger.service'
import { MarketError } from 'src/shared/errors/market.error'
import { Command } from 'src/shared/interfaces/command.interface'
import { MarketStore, StoreService } from './store.service'
import { StoreSlot } from './store.slot'

export class GetStoresCommand implements Command<MarketStore[]> {
  constructor(
    private readonly service: StoreService,
    private readonly slot: StoreSlot,
    private readonly logger: LoggerService
  ) {}

  async exec(): Promise<MarketStore[]> {
    const observ$ = this.service.getStores().pipe(
      tap((stores) => {
        this.slot.subject$.next({
          type: 'get',
          stores
        })
      }),
      catchError((err) => {
        this.logger.error(err)
        return throwError(
          () => new MarketError(`GetStoresCommand - ${err.toString()}`)
        )
      })
    )
    return firstValueFrom(observ$)
  }
}
