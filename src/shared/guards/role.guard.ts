import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { messages } from 'src/core/auth/messages'
import { UserRole } from 'src/core/user/user-role.enum'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<UserRole[]>('roles', context.getHandler())
    const { user } = context.switchToHttp().getRequest()
    if (!roles) return true
    if (!roles.includes(user?.role)) {
      throw new ForbiddenException(messages.forbidden())
    }
    return true
  }
}
