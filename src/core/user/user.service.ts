import { Injectable } from '@nestjs/common'
import { Service } from 'src/shared/abstract/service.abstract'
import { UserRepository } from './user.repository'
import { UserDocument } from './user.schema'

@Injectable()
export class UserService extends Service<UserRepository, UserDocument> {
  constructor(protected readonly repository: UserRepository) {
    super()
  }
}
