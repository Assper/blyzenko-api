import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export type StoreSettings = {
  selfPickaping: boolean
  deliveryRadius: number
  maxWeight: number
  stopStartDate: Date
  stopEndDate: Date
}

const StoreSettingsSchema = raw({
  selfPickaping: { type: Boolean, required: true, default: false },
  deliveryRadius: { type: Number, required: true, default: 0 },
  maxWeight: { type: Number, required: true, default: 0 },
  stopStartDate: { type: Date, required: true, default: Date.now },
  stopEndDate: { type: Date, required: true, default: Date.now }
}) as StoreSettings

@Schema()
export class Store {
  _id: Types.ObjectId

  @Prop({
    type: String,
    required: true
  })
  address: string

  @Prop({
    type: String,
    required: true,
    default: ''
  })
  mobilePhoneNumber: string

  @Prop({
    type: Number,
    required: true,
    default: 0.0
  })
  latitude: number

  @Prop({
    type: Number,
    required: true,
    default: 0.0
  })
  longitude: number

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
  isSelfPickupAvailable: boolean

  @Prop({
    type: Number,
    required: true
  })
  shopNumber: number

  @Prop(StoreSettingsSchema)
  settings: StoreSettings
}

export const StoreSchema = SchemaFactory.createForClass(Store)
