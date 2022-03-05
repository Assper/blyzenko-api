import { IsPhoneNumber, IsString } from 'class-validator'
import { messages } from '../messages'

export class CreateConfirmDTO {
  @IsString({ message: messages.invalidDeviceId() })
  readonly deviceId: string

  @IsPhoneNumber('UA', { message: messages.invalidPhone() })
  readonly phone: string
}
