import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Repository } from 'src/shared/abstract/repository.abstract'
import {
  ConfirmToken,
  ConfirmTokenDocument
} from '../schemas/confirm-token.schema'

@Injectable()
export class ConfirmTokenRepository extends Repository<ConfirmTokenDocument> {
  constructor(
    @InjectModel(ConfirmToken.name)
    protected readonly model: Model<ConfirmTokenDocument>
  ) {
    super()
    this.model.syncIndexes()
  }
}
