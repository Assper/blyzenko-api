import { Controller } from '@nestjs/common'
import { AuthSlot } from '../auth/auth.slot'
import { ConfirmTokenDocument } from '../auth/schemas/confirm-token.schema'
import { LoggerService } from '../logger/logger.service'
import { NotifyService } from './notify.service'
import { SmsPhonePipe } from './sms-phone.pipe'

@Controller('notify')
export class NotifyController {
  constructor(
    private readonly service: NotifyService,
    private readonly authSlot: AuthSlot,
    private readonly logger: LoggerService
  ) {
    this.init()
  }

  private init(): void {
    this.authSlot.confirm().subscribe(this.sendSmsCode.bind(this))
  }

  private async sendSmsCode(confirm?: ConfirmTokenDocument): Promise<boolean> {
    if (!confirm) {
      this.logger.log(
        `NotifyController (sendSmsCode): confirm token not emmited`
      )
      return
    }
    const { phone, token } = confirm
    const validPhone = new SmsPhonePipe().transform(phone)
    return await this.service.sendAuthConfirm(token, validPhone)
  }
}
