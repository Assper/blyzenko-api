import { init } from 'sendpulse-api'
import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { resolve } from 'path'

@Injectable()
export class SendPulseConfig {
  readonly userId: string
  readonly password: string
  readonly uri: string
  readonly storage = resolve(__dirname, '..', '..', 'storage')

  constructor(private readonly configService: NestConfigService) {
    this.userId = this.configService.get<string>('sendPulse.userId')
    this.password = this.configService.get<string>('sendPulse.secret')
    this.uri = this.configService.get<string>('sendPulse.uri')

    init(this.userId, this.password, this.storage, console.log)
  }
}
