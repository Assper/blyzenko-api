import { Controller } from '@nestjs/common'
import { AuthSlot } from '../auth/auth.slot'
import { NotifyService } from './notify.service'
import { SmsPhonePipe } from './sms-phone.pipe'

@Controller('notify')
export class NotifyController {
  constructor(
    private readonly service: NotifyService,
    private readonly authSlot: AuthSlot
  ) {
    this.init()
  }

  private init(): void {
    this.authSlot.confirm().subscribe(async (confirm) => {
      if (!confirm) return
      const { phone, token } = confirm
      const validPhone = new SmsPhonePipe().transform(phone)
      await this.service.sendAuthConfirm(token, validPhone)
    })
  }
}
