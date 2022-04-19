import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import { User } from './user.schema'

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectModel(User.name)
    protected readonly model: Model<User>
  ) {
    super()
    this.model.syncIndexes()
  }
}
