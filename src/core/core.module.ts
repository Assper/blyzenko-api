import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AuthMiddleware } from './auth/auth.middleware'
import { AuthModule } from './auth/auth.module'
import { HealthModule } from './health/health.module'
import { LoggerModule } from './logger/logger.module'
import { EmployeeModule } from './market/employee/employee.module'
import { MarketModule } from './market/market.module'
import { NotifyModule } from './notify/notify.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    LoggerModule,
    HealthModule,
    MarketModule,
    AuthModule,
    UserModule,
    EmployeeModule,
    NotifyModule
  ]
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
