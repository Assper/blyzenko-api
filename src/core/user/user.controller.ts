import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { OwnDataGuard } from 'src/shared/guards/own-data.guard'
import { IsMongoIdPipe } from 'src/shared/pipes/mongo-id.pipe'
import { UserCommandFactory } from './user-command.factory'
import { UserDocument } from './user.schema'

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly user: UserCommandFactory) {}

  @Get(':id')
  @UseGuards(OwnDataGuard)
  getById(@Param('id', IsMongoIdPipe) userId: string): Promise<UserDocument> {
    const command = this.user.getUserById(userId)
    return command.exec()
  }
}
