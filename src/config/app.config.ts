import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { isInt } from 'class-validator'
import { EnvError } from 'src/shared/errors/env.error'

const envs = ['production', 'test', 'development']
type Env = 'production' | 'test' | 'development'

@Injectable()
export class AppConfig {
  readonly env: Env
  readonly port: number
  readonly isDev: boolean
  readonly isTest: boolean
  readonly isProd: boolean
  readonly urlLimit = '25mb'
  readonly jsonLimit = '25mb'
  readonly base = 'api'

  constructor(private readonly configService: NestConfigService) {
    this.env = this.configService.get<Env>('env')
    this.port = this.configService.get<number>('port')
    this.isDev = this.env === 'development'
    this.isTest = this.env === 'test'
    this.isProd = this.env === 'production'

    this.validate()
  }

  private isEnv(value: unknown): value is Env {
    return envs.includes(value as string)
  }

  private validate(): void {
    if (!this.isEnv(this.env)) {
      throw new EnvError(`AppConfig - Env should be some of ${envs}`)
    }

    if (!isInt(this.port)) {
      throw new EnvError('AppConfig - Port should be valid integer value')
    }
  }
}
