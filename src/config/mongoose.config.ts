import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose'
import { isString } from 'class-validator'
import { EnvError } from 'src/shared/errors/env.error'

@Injectable()
export class MongooseConfig implements MongooseOptionsFactory {
  readonly username: string
  readonly password: string
  readonly uri: string

  constructor(private readonly configService: NestConfigService) {
    this.username = this.configService.get<string>('mongo.username')
    this.password = this.configService.get<string>('mongo.password')
    this.uri = this.configService.get<string>('mongo.uri')

    this.validate()
  }

  private validate(): void {
    if (!this.username || !isString(this.username)) {
      throw new EnvError(`${MongooseConfig.name} - username should be string`)
    }

    if (!this.password || !isString(this.password)) {
      throw new EnvError(`${MongooseConfig.name} - password should be string`)
    }

    if (!this.uri || !isString(this.uri)) {
      throw new EnvError(`${MongooseConfig.name} - uri should be string`)
    }
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.uri,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      auth: {
        username: this.username,
        password: this.password
      }
    }
  }
}
