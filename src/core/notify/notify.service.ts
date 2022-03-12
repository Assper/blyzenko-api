import { Inject, Injectable } from '@nestjs/common'
import { SmsChannel } from './interfaces/sms-channel.interface'
import { SMS_CHANNEL } from './provider-tokens'

@Injectable()
export class NotifyService {
  constructor(@Inject(SMS_CHANNEL) protected readonly sms: SmsChannel) {}

  async sendAuthConfirm(token: number, phone: string): Promise<boolean> {
    const body = `Ваш код авторизації: ${token}`
    return this.sms.send(phone, body)
  }
}
