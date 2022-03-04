import { NotFoundException } from '@nestjs/common'
import { Command } from 'src/shared/interfaces/command.interface'
import { messages } from '../messages'
import { UserDocument } from '../user.schema'
import { UserService } from '../user.service'
import { UserSlot } from '../user.slot'

export class GetByIdCommand implements Command<UserDocument> {
  constructor(
    private readonly service: UserService,
    private readonly slot: UserSlot,
    private readonly userId: string
  ) {}

  async exec(): Promise<UserDocument> {
    const user = await this.service.getById(this.userId)
    if (!user) {
      throw new NotFoundException(messages.userByIdNotFound(this.userId))
    }

    this.slot.subject$.next({
      type: 'get-by-id',
      user
    })
    return user
  }
}
