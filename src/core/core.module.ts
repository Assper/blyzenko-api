import { Module } from '@nestjs/common'
import { HealthModule } from './health/health.module'
import { LoggerModule } from './logger/logger.module'
import { MarketModule } from './market/market.module'

@Module({
  imports: [LoggerModule, HealthModule, MarketModule]
})
export class CoreModule {}
