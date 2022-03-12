import { Module } from '@nestjs/common'
import { ConfigModule } from 'src/config/config.module'
import { AuthModule } from '../auth/auth.module'
import { LoggerModule } from '../logger/logger.module'
import { PushAdapter } from './adapters/push.adapter'
import { SmsAdapter } from './adapters/sms.adapter'
import { NotifyController } from './notify.controller'
import { NotifyService } from './notify.service'
import { PUSH_CHANNEL, SMS_CHANNEL } from './provider-tokens'

const adapters = [
  { provide: SMS_CHANNEL, useClass: SmsAdapter },
  { provide: PUSH_CHANNEL, useClass: PushAdapter }
]

@Module({
  imports: [LoggerModule, AuthModule, ConfigModule],
  providers: [...adapters, NotifyService],
  controllers: [NotifyController]
})
export class NotifyModule {}
