import { NotFoundException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { messages } from '../messages'
import { User } from '../user.schema'
import { UserService } from '../user.service'
import { UserSlot } from '../user.slot'

export class GetByPhoneCommand implements Command<User> {
  constructor(
    private readonly service: UserService,
    private readonly slot: UserSlot,
    private readonly phone: string
  ) {}

  async exec(): Promise<User> {
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
