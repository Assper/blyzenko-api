import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { isString } from 'class-validator'
import { EnvError } from 'src/shared/errors/env.error'

@Injectable()
export class MarketConfig {
  readonly access: string
  readonly base: string

  constructor(private readonly configService: NestConfigService) {
    this.access = this.configService.get<string>('market.access')
    this.base = this.configService.get<string>('market.base')

    this.validate()
  }

  private validate(): void {
    if (!this.access || !isString(this.access)) {
      throw new EnvError(`${MarketConfig.name} - access should be string`)
    }

    if (!this.base || !isString(this.base)) {
      throw new EnvError(`${MarketConfig.name} - base should be string`)
    }
  }
}
