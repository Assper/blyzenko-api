import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserCommandFactory } from './user-command.factory'
import { UserController } from './user.controller'
import { UserRepository } from './user.repository'
import { User, UserSchema } from './user.schema'
import { UserService } from './user.service'
import { UserSlot } from './user.slot'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserRepository, UserService, UserCommandFactory, UserSlot],
  exports: [UserCommandFactory, UserSlot],
  controllers: [UserController]
})
export class UserModule {}
