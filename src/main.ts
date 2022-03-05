import { ValidationPipe } from '@nestjs/common'
import { NestFactory, Reflector } from '@nestjs/core'
import { json, urlencoded } from 'express'
import helmet from 'helmet'
import { AppModule } from './app.module'
import { AppConfig } from './config/app.config'
import { LoggerService } from './core/logger/logger.service'
import { RoleGuard } from './shared/guards/role.guard'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true
  })
  const config = app.get(AppConfig)
  const logger = app.get(LoggerService)

  app.use(helmet())
  app.use(json({ limit: config.jsonLimit }))
  app.use(urlencoded({ extended: true, limit: config.urlLimit }))
  app.useLogger(logger)
  app.useGlobalPipes(new ValidationPipe())
  app.useGlobalGuards(new RoleGuard(new Reflector()))
  app.setGlobalPrefix(config.base)
  await app.listen(config.port)
}

bootstrap()
