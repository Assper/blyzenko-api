import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { AppConfig } from 'src/config/app.config'
import { AuthToken } from 'src/shared/decorators/auth-token.decorator'
import { OwnDataGuard } from 'src/shared/guards/own-data.guard'
import { EmptyObject } from 'src/shared/types/util-types'
import { AuthCommandFactory } from './auth-command.factory'
import { CreateConfirmDTO } from './dto/create-confirm.dto'
import { LoginDTO } from './dto/login.dto'
import { AuthTokenTransform } from './interceptors/auth-token-transform.interceptor'
import { AuthTokenDocument } from './schemas/auth-token.schema'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly auth: AuthCommandFactory,
    private readonly config: AppConfig
  ) {}

  @Post('login')
  @UseInterceptors(AuthTokenTransform)
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: LoginDTO): Promise<AuthTokenDocument> {
    const command = this.auth.login(data)
    return command.exec()
  }

  @Post('logout')
  @UseGuards(OwnDataGuard)
  @UseInterceptors(AuthTokenTransform)
  @HttpCode(HttpStatus.OK)
  async logout(@AuthToken() token: string): Promise<AuthTokenDocument> {
    return this.auth.logout(token).exec()
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(
    @Body() data: CreateConfirmDTO
  ): Promise<{ token: number } | EmptyObject> {
    const confirm = await this.auth.createConfirmToken(data).exec()

    // Don't expose token for prod
    if (this.config.isProd) return {}
    return { token: confirm.token }
  }
}
