import { catchError, firstValueFrom, tap, throwError } from 'rxjs'
import { LoggerService } from 'src/core/logger/logger.service'
import { MarketError } from 'src/shared/errors/market.error'
import { Command } from 'src/shared/interfaces/command.interface'
import { MarketEmployee, EmployeeService } from './employee.service'
import { EmployeeSlot } from './employee.slot'

export class GetEmployeesCommand implements Command<MarketEmployee[]> {
  constructor(
    private readonly service: EmployeeService,
    private readonly slot: EmployeeSlot,
    private readonly logger: LoggerService
  ) {}

  async exec(): Promise<MarketEmployee[]> {
    const observ$ = this.service.getEmployees().pipe(
      tap((employees) => {
        this.slot.subject$.next({
          type: 'get',
          employees
        })
      }),
      catchError((err) => {
        this.logger.error(err)
        return throwError(
          () => new MarketError(`GetEmployeesCommand - ${err.toString()}`)
        )
      })
    )
    return firstValueFrom(observ$)
  }
}
