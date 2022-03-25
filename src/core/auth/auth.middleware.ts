import { Injectable, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'
import { EmployeeDocument } from '../employee/employee.schema'
import { UserRole } from '../user/user-role.enum'
import { UserDocument } from '../user/user.schema'
import { AuthCommandFactory } from './auth-command.factory'

type UserData = Partial<UserDocument | Omit<EmployeeDocument, 'role'>> & {
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
          req.user = {
            ...token.user,
            role: UserRole.Customer
          }
        } else if (token.employee) {
          req.user = {
            ...token.employee,
            role: UserRole.Employee
          }
        } else {
          req.user = { role: UserRole.SuperUser }
        }
      }
    }
    next()
  }
}
