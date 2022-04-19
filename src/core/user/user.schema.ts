import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

export type UserAddress = {
  street: string
  building: string
  floor: string
  apart: string
  longitude: number
  latitude: number
}

const Address = raw({
  street: { type: String, required: true },
  building: { type: String, required: true },
  floor: { type: String, required: true },
  apart: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true }
}) as UserAddress

@Schema()
export class User {
  _id: Types.ObjectId

  @Prop({
    type: String,
    required: true
  })
  deviceId: string

  @Prop({
    type: String,
    required: true,
    unique: true
  })
  phone: string

  @Prop({
    type: String,
    default: ''
  })
  name: string

  @Prop({
    type: String,
    default: ''
  })
  lastName: string

  @Prop({
    type: String,
    default: ''
  })
  sex: string

  @Prop({
    type: String
  })
  birth?: string

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
  adult: boolean

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
  isVip: boolean

  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
  isBanned: boolean

  @Prop({ type: [Address], required: true, default: [] })
  addresses: UserAddress[]

  // @Prop({ type: [String] })
  // favorites: string[]

  @Prop({
    type: Date,
    immutable: true,
    required: true,
    default: Date.now
  })
  createdAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
