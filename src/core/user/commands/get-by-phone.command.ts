import { NotFoundException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { messages } from '../messages'
import { UserDocument } from '../user.schema'
import { UserService } from '../user.service'
import { UserSlot } from '../user.slot'

export class GetByPhoneCommand implements Command<UserDocument> {
  constructor(
    private readonly service: UserService,
    private readonly slot: UserSlot,
    private readonly phone: string
  ) {}

  async exec(): Promise<UserDocument> {
    const user = await this.service.findOne({ phone: this.phone })
    if (!user) {
      throw new NotFoundException(messages.userByPhoneNotFound(this.phone))
    }

    this.slot.subject$.next({
      type: 'get',
      user
    })
    return user
  }
}
