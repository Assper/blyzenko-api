import { Controller, Get, Param } from '@nestjs/common'
import { UserCommandFactory } from './user-command.factory'
import { UserDocument } from './user.schema'

@Controller('users')
export class UserController {
  constructor(private readonly user: UserCommandFactory) {}

  @Get(':id')
  getById(@Param('id') userId: string): Promise<UserDocument> {
    const command = this.user.getUserById(userId)
    return command.exec()
  }
}
