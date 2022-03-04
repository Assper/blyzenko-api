import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule as NestConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from './config/config.module'
import { MongooseConfig } from './config/mongoose.config'
import { CoreModule } from './core/core.module'

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [NestConfigModule, ConfigModule],
      useClass: MongooseConfig
    }),
    CoreModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
