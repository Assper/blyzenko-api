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
import { EmptyObject } from 'src/shared/types/util-types'
import { CreateConfirmDTO } from './dto/create-confirm.dto'

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

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(): Promise<EmptyObject> {
    return {}
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(@Body() data: CreateConfirmDTO): Promise<{ token: number }> {
    const confirm = await this.auth.createConfirmToken(data).exec()
    return { token: confirm.token }
  }
}
