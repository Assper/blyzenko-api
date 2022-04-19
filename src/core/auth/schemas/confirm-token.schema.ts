import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'

const tokenExpire = 60 * 5 // 5m

@Schema()
export class ConfirmToken {
  _id: Types.ObjectId

  @Prop({
    type: String,
    immutable: true,
    required: true
  })
  phone: string

  @Prop({
    type: String,
    required: true,
    immutable: true,
    unique: true
  })
  deviceId: string

  @Prop({
    type: Number,
    required: true
  })
  token: number

  @Prop({ type: Date, required: true, expires: tokenExpire, default: Date.now })
  expires: Date
}

export const ConfirmTokenSchema = SchemaFactory.createForClass(ConfirmToken)
