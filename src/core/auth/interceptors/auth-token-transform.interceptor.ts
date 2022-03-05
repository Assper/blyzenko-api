import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserDocument } from 'src/core/user/user.schema'
import { AuthTokenDocument } from '../schemas/auth-token.schema'

export type AuthData = {
  token: string
  user?: UserDocument
}

@Injectable()
export class AuthTokenTransform
  implements NestInterceptor<AuthTokenDocument, AuthData>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<AuthData> {
    return next.handle().pipe(
      map((data: AuthTokenDocument) => ({
        token: data.token,
        user: data.user
      }))
    )
  }
}
