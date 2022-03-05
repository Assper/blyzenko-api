import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
import { messages } from 'src/core/auth/messages'
import { UserRole } from 'src/core/user/user-role.enum'

@Injectable()
export class OwnDataGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const { id } = request.params
    const { user } = request
    if (user?.role === UserRole.SuperUser) return true
    if (user?._id !== id) {
      throw new ForbiddenException(messages.forbidden())
    }
    return true
  }
}
