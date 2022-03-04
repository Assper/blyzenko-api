import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { AppConfig } from './app.config'
import { config } from './config'
import { MarketConfig } from './market.config'
import { MongooseConfig } from './mongoose.config'

@Module({
  imports: [NestConfigModule.forRoot({ load: [config] })],
  providers: [AppConfig, MongooseConfig, MarketConfig],
  exports: [AppConfig, MongooseConfig, MarketConfig]
})
export class ConfigModule {}
