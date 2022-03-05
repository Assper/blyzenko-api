import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
import { UserRole } from '../user/user-role.enum'
import { AuthCommandFactory } from './auth-command.factory'

type UserData = {
  role: UserRole
}

export type RequestWithUser = Request & { user?: UserData }

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly auth: AuthCommandFactory) {}

  async use(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const authToken = req.header('Authorization')
    if (authToken) {
      const command = this.auth.getAuthToken(authToken)
      const token = await command.exec()
      if (token) {
        if (token.user) {
          req.user = { role: UserRole.Customer }
        } else {
          req.user = { role: UserRole.SuperUser }
        }
      }
    }
    next()
  }
}
