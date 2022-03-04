import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UserRepository extends Repository<UserDocument> {
  constructor(
    @InjectModel(User.name)
    protected readonly model: Model<UserDocument>
  ) {
    super()
    this.model.syncIndexes()
  }
}
