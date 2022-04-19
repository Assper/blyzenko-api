import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from 'src/core/user/user.schema'
import { AuthToken } from '../schemas/auth-token.schema'

export type AuthData = {
  token: string
  user?: User
}

@Injectable()
export class AuthTokenTransform
  implements NestInterceptor<AuthToken, AuthData>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<AuthData> {
    return next.handle().pipe(
      map((data: AuthToken) => ({
        token: data.token,
        user: data.user
      }))
    )
  }
}
