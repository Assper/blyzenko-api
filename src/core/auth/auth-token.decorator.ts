import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
import { messages } from './messages'

export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request
    const token = request.header('Authorization')
    if (!token) {
      throw new UnauthorizedException(messages.unauthorazied())
    }
    return token
  }
)
