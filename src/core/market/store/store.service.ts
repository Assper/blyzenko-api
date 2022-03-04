import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { MarketConfig } from 'src/config/market.config'
import { MarketSerivce } from '../abstract/market.service'

export type MarketStore = {
  id: number
  address: string
  latitude: number
  longitude: number
  isSelfPickupAvailable: boolean
  shopNumber: number
  mobilePhoneNumber: string
}

type MarketStoreResponse = {
  data: {
    stores: MarketStore[]
  }
}

@Injectable()
export class StoreService extends MarketSerivce {
  protected readonly base: string

  constructor(config: MarketConfig, private readonly http: HttpService) {
    super(config)
    this.base = `${this.config.base}/stores`
  }

  getStores(): Observable<MarketStore[]> {
    return this.http
      .get<MarketStoreResponse>(this.base, this.options)
      .pipe(map((response) => response.data.data.stores))
  }
}
