import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common'
import { isMongoId } from 'class-validator'
import { messages } from '../messages'

@Injectable()
export class IsMongoIdPipe implements PipeTransform {
  transform(value: unknown) {
    if (!isMongoId(value)) {
      throw new BadRequestException(messages.invalidMongoId(value as string))
    }
    return value
  }
}
