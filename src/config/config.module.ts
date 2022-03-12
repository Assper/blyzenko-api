import { Module } from '@nestjs/common'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { AppConfig } from './app.config'
import { config } from './config'
import { FirebaseConfig } from './firebase.config'
import { MarketConfig } from './market.config'
import { MongooseConfig } from './mongoose.config'
import { SendPulseConfig } from './sendpulse.config'
import { SuperUserConfig } from './super-user.config'

const configs = [
  AppConfig,
  MongooseConfig,
  MarketConfig,
  SuperUserConfig,
  FirebaseConfig,
  SendPulseConfig
]

@Module({
  imports: [NestConfigModule.forRoot({ load: [config] })],
  providers: [...configs],
  exports: [...configs]
})
export class ConfigModule {}
