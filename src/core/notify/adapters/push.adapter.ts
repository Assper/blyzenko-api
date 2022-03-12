import { Injectable } from '@nestjs/common'
import * as admin from 'firebase-admin'
import { AppConfig } from 'src/config/app.config'
import { LoggerService } from 'src/core/logger/logger.service'
import { PushChannel, PushPayload } from '../interfaces/push-channel.interface'

@Injectable()
export class PushAdapter implements PushChannel {
  constructor(
    private readonly config: AppConfig,
    private readonly logger: LoggerService
  ) {}

  private async sendToDevice(
    deviceId: string | string[],
    body: admin.messaging.MessagingPayload
  ): Promise<boolean> {
    try {
      await admin.messaging().sendToDevice(deviceId, body)
      return true
    } catch (e) {
      this.logger.error(e)
      return false
    }
  }

  async send(deviceId: string | string[], body: PushPayload): Promise<boolean> {
    // Don't send push on local env
    if (this.config.isDev) {
      this.logger.log(`Push send successfully: ${deviceId}, ${body}`)
      return true
    }
    return this.sendToDevice(deviceId, body as admin.messaging.MessagingPayload)
  }
}
