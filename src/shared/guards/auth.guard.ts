import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
import { messages } from 'src/core/auth/messages'

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest()
    if (!user) {
      throw new ForbiddenException(messages.forbidden())
    }
    return true
  }
}
