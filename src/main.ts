import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { AppConfig } from './config/app.config'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true })
  const config = app.get(AppConfig)

  app.use(helmet())
  app.use(json({ limit: config.jsonLimit }))
  app.use(urlencoded({ extended: true, limit: config.urlLimit }))
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix(config.base)
  await app.listen(config.port)
}

bootstrap()
