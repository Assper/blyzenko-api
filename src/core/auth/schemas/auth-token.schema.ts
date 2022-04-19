import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as MongooseSchema, Types } from 'mongoose'
import { Employee } from 'src/core/employee/employee.schema'
import { User } from 'src/core/user/user.schema'
import { v4 } from 'uuid'

const month = 3600 * 24 * 30

@Schema()
export class AuthToken {
  _id: Types.ObjectId

  @Prop({
    type: String,
    required: true,
    unique: true,
    default: v4
  })
  token: string

  @Prop({
    type: String,
    required: true,
    immutable: true,
    unique: true
  })
  deviceId: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user?: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Employee.name })
  employee?: Employee

  @Prop({ type: Date, required: true, expires: month, default: Date.now })
  expires: Date
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken)
AuthTokenSchema.pre(/^find/, function () {
  this.populate('user')
  this.populate('employee')
})
