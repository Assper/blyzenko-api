import { Injectable } from '@nestjs/common'
import { smsSend } from 'sendpulse-api'
import { AppConfig } from 'src/config/app.config'
import { LoggerService } from 'src/core/logger/logger.service'
import { SmsChannel } from '../interfaces/sms-channel.interface'

type SendPulseError = {
  is_error: number
  message: string
}

type SendPulseResult = SendPulseError | Record<string, unknown>

@Injectable()
export class SmsAdapter implements SmsChannel {
  private readonly senderName = 'Blyzenko'

  constructor(
    private readonly config: AppConfig,
    private readonly logger: LoggerService
  ) {}

  private isSendPuleError(value: unknown): value is SendPulseError {
    return (
      typeof value === 'object' &&
      typeof (value as SendPulseError).is_error === 'number'
    )
  }

  async send(phone: string | string[], body: string): Promise<boolean> {
    // Don't send SMS on local env
    if (this.config.isDev) {
      this.logger.log(`SMS send success: ${phone}, ${body}`)
      return true
    }

    const phones = Array.isArray(phone) ? phone : [phone]
    return new Promise((resolve, reject) => {
      smsSend(
        (result: SendPulseResult): void => {
          if (this.isSendPuleError(result)) {
            this.logger.error(result)
            return reject(result)
          }

          this.logger.log(`SMS send successfully: ${JSON.stringify(result)}`)
          resolve(true)
        },
        this.senderName,
        phones,
        body,
        undefined,
        0,
        undefined
      )
    })
  }
}
