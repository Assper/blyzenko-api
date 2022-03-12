import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'
import * as admin from 'firebase-admin'

@Injectable()
export class FirebaseConfig {
  readonly cert: admin.ServiceAccount

  constructor(private readonly configService: NestConfigService) {
    this.cert = this.configService.get<admin.ServiceAccount>('firebase')
    admin.initializeApp({
      credential: admin.credential.cert(this.cert)
    })
  }
}
