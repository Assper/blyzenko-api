import { Injectable } from '@nestjs/common'
import { Service } from 'src/shared/abstract/service.abstract'
import { UserRepository } from './user.repository'
import { User } from './user.schema'

@Injectable()
export class UserService extends Service<UserRepository, User> {
  constructor(protected readonly repository: UserRepository) {
    super()
  }
}
