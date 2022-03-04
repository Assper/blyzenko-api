import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { MarketConfig } from 'src/config/market.config'

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
export class StoreService {
  private readonly base: string

  constructor(
    private readonly config: MarketConfig,
    private readonly http: HttpService
  ) {
    this.base = `${this.config.base}/stores`
  }

  getStores(): Observable<MarketStore[]> {
    return this.http
      .get<MarketStoreResponse>(this.base)
      .pipe(map((response) => response.data.data.stores))
  }
}
