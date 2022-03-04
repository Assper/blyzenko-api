import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { MarketConfig } from 'src/config/market.config'
import { MarketSerivce } from '../abstract/market.service'

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
export class EmployeeService extends MarketSerivce {
  protected readonly base: string

  constructor(config: MarketConfig, private readonly http: HttpService) {
    super(config)
    this.base = `${this.config.base}/employees`
  }

  getEmployees(): Observable<MarketEmployee[]> {
    return this.http
      .get<MarketEmployeeResponse>(this.base, this.options)
      .pipe(map((response) => response.data.data.employees))
  }
}
