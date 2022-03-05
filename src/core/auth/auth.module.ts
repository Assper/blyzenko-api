import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from 'src/config/config.module'
import { LoggerModule } from '../logger/logger.module'
import { UserModule } from '../user/user.module'
import { AuthCommandFactory } from './auth-command.factory'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { AuthSlot } from './auth.slot'
import { AuthTokenTransform } from './interceptors/auth-token-transform.interceptor'
import { AuthTokenRepository } from './repositories/auth-token.repository'
import { ConfirmTokenRepository } from './repositories/confirm-token.repository'
import { AuthToken, AuthTokenSchema } from './schemas/auth-token.schema'
import {
  ConfirmToken,
  ConfirmTokenSchema
} from './schemas/confirm-token.schema'
import { CustomerLoginStrategy } from './strategies/customer-login.strategy'
import { SuperUserLoginStrategy } from './strategies/super-user-login.strategy'

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    MongooseModule.forFeature([
      { name: AuthToken.name, schema: AuthTokenSchema },
      { name: ConfirmToken.name, schema: ConfirmTokenSchema }
    ]),
    UserModule
  ],
  providers: [
    ConfirmTokenRepository,
    AuthTokenRepository,
    AuthService,
    AuthSlot,
    AuthCommandFactory,
    SuperUserLoginStrategy,
    CustomerLoginStrategy,
    AuthTokenTransform
  ],
  exports: [AuthSlot, AuthCommandFactory],
  controllers: [AuthController]
})
export class AuthModule {}
