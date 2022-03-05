import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose'
import { Document } from 'mongoose'

const tokenExpire = 60 * 5 // 5m

@Schema()
export class ConfirmToken {
  @Prop({
    type: String,
    immutable: true,
    required: true
  })
  phone: string

  @Prop({
    type: Number,
    immutable: true,
    required: true
  })
  token: number

  @Prop({ type: Date, required: true, expires: tokenExpire, default: Date.now })
  expires: Date
}

export type ConfirmTokenDocument = ConfirmToken & Document<ConfirmToken>
export const ConfirmTokenSchema = SchemaFactory.createForClass(ConfirmToken)
