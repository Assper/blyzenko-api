import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { MarketConfig } from 'src/config/market.config'

export type MarketEmployee = {
  employeeId: number
  firstName: string
  middleName: string
  lastName: string
  roleId: number
  role: string
  storeId: number
}

type MarketEmployeeResponse = {
  data: {
    employees: MarketEmployee[]
  }
}

@Injectable()
export class EmployeeService {
  private readonly base: string

  constructor(
    private readonly config: MarketConfig,
    private readonly http: HttpService
  ) {
    this.base = `${this.config.base}/employees`
  }

  getEmployees(): Observable<MarketEmployee[]> {
    return this.http
      .get<MarketEmployeeResponse>(this.base)
      .pipe(map((response) => response.data.data.employees))
  }
}
