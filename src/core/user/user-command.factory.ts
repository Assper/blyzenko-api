import { Injectable } from '@nestjs/common'
import { GetByIdCommand } from './commands/get-by-id.command'
import { UserService } from './user.service'
import { UserSlot } from './user.slot'

@Injectable()
export class UserCommandFactory {
  constructor(
    private readonly userService: UserService,
    private readonly slot: UserSlot
  ) {}

  getUserById(id: string): GetByIdCommand {
    return new GetByIdCommand(this.userService, this.slot, id)
  }
}
