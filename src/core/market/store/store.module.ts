import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { ConfigModule } from 'src/config/config.module'
import { LoggerModule } from 'src/core/logger/logger.module'
import { StoreCommandFactory } from './store-command.factory'
import { StoreService } from './store.service'
import { StoreSlot } from './store.slot'

@Module({
  imports: [HttpModule, LoggerModule, ConfigModule],
  providers: [StoreSlot, StoreService, StoreCommandFactory],
  exports: [StoreCommandFactory, StoreSlot]
})
export class StoreModule {}
