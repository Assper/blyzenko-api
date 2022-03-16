import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  MongooseHealthIndicator
} from '@nestjs/terminus'
import { MarketHealthIndicator } from './market.health-indicator'

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: MongooseHealthIndicator,
    private readonly market: MarketHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.db.pingCheck('mongodb'),
      () => this.market.isHealthy('market')
    ])
  }
}
