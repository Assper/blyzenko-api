import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { isPhoneNumber, isString } from 'class-validator'
import { messages } from './messages'

@Injectable()
export class SmsPhonePipe implements PipeTransform {
  transform(value: unknown) {
    if (!isString(value)) {
      throw new BadRequestException(messages.invalidPhone(value as string))
    }

    const phone = value.startsWith('+') ? value.slice(1) : `38${value}`
    if (!isPhoneNumber(`+${phone}`, 'UA')) {
      throw new BadRequestException(messages.invalidPhone(value as string))
    }

    return phone
  }
}
