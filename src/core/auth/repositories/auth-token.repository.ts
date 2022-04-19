import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import { AuthToken } from '../schemas/auth-token.schema'

@Injectable()
export class AuthTokenRepository extends Repository<AuthToken> {
  constructor(
    @InjectModel(AuthToken.name)
    protected readonly model: Model<AuthToken>
  ) {
    super()
    this.model.syncIndexes()
  }
}
