import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { ConfigModule } from 'src/config/config.module'
import { HealthController } from './health.controller'
import { MarketHealthIndicator } from './market.health-indicator'

@Module({
  imports: [TerminusModule, HttpModule, ConfigModule],
  providers: [MarketHealthIndicator],
  controllers: [HealthController]
})
export class HealthModule {}
