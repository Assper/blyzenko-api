import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { RequestWithUser } from 'src/core/auth/auth.middleware'
import { messages } from 'src/core/auth/messages'

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest() as RequestWithUser
    if (!user) {
      throw new UnauthorizedException(messages.unauthorized())
    }
    return user
  }
)
