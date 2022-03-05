import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { isString } from 'class-validator'
import { EnvError } from 'src/shared/errors/env.error'

@Injectable()
export class SuperUserConfig {
  readonly login: string
  readonly password: string

  constructor(private readonly configService: NestConfigService) {
    this.login = this.configService.get<string>('superUser.login')
    this.password = this.configService.get<string>('superUser.password')

    this.validate()
  }

  private validate(): void {
    if (!this.login || !isString(this.login)) {
      throw new EnvError(`${SuperUserConfig.name} - login should be string`)
    }

    if (!this.password || !isString(this.password)) {
      throw new EnvError(`${SuperUserConfig.name} - password should be string`)
    }
  }
}
