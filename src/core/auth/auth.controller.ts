import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors
} from '@nestjs/common'
import { LoginDTO } from './dto/login.dto'
import { AuthTokenDocument } from './schemas/auth-token.schema'
import { AuthCommandFactory } from './auth-command.factory'
import { AuthTokenTransform } from './interceptors/auth-token-transform.interceptor'

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthCommandFactory) {}

  @Post('login')
  @UseInterceptors(AuthTokenTransform)
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDTO): Promise<AuthTokenDocument> {
    const command = this.auth.login(data)
    return command.exec()
  }
}
