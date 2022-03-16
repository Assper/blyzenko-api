import { HttpService } from '@nestjs/axios'
import { HttpStatus, Injectable } from '@nestjs/common'
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult
} from '@nestjs/terminus'
import { firstValueFrom } from 'rxjs'
import { MarketConfig } from 'src/config/market.config'

export interface Market {
  name: string
  type: string
}

@Injectable()
export class MarketHealthIndicator extends HealthIndicator {
  constructor(
    private readonly config: MarketConfig,
    private readonly http: HttpService
  ) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const endpoint = `${this.config.base}/stores`
    const req$ = this.http.get(endpoint, {
      headers: { Authorization: `Bearer ${this.config.access}` },
      validateStatus: () => true
    })
    const res = await firstValueFrom(req$)
    const isHealthy = res.status === HttpStatus.OK
    const result = this.getStatus(key, isHealthy, {
      status: res.status,
      url: endpoint
    })

    if (isHealthy) return result
    throw new HealthCheckError('Marketcheck failed', result)
  }
}
