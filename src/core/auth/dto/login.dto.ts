import { IsInt, IsOptional, IsPhoneNumber, IsString } from 'class-validator'
import { messages } from '../messages'

export class LoginDTO {
  @IsString({ message: messages.invalidDeviceId() })
  readonly deviceId: string

  @IsOptional()
  @IsInt({ message: messages.invalidConfirm() })
  readonly confirm?: number

  @IsOptional()
  @IsPhoneNumber('UA', { message: messages.invalidPhone() })
  readonly phone?: string

  @IsOptional()
  @IsString({ message: messages.invalidEmployeeId() })
  readonly id?: string

  @IsOptional()
  @IsString({ message: messages.invalidPassword() })
  readonly password?: string
}
