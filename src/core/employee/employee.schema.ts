import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Types } from 'mongoose'
import { EmployeeRole } from './enums/employee-role.enum'
import { EmployeeStatus } from './enums/employee-status.enum'

export type EmployeeName = {
  first: string
  middle: string
  last: string
}

const EmployeeNameSchema = raw({
  first: { type: String, required: true, default: '' },
  middle: { type: String, required: true, default: '' },
  last: { type: String, required: true, default: '' }
}) as EmployeeName

@Schema()
export class Employee {
  _id: Types.ObjectId

  @Prop({
    type: Number,
    required: true,
    index: true,
    unique: true
  })
  employeeId: number

  @Prop(EmployeeNameSchema)
  name: EmployeeName

  @Prop({
    type: Number,
    required: true,
    enum: Object.values(EmployeeRole),
    default: EmployeeRole.Packer
  })
  roleId: EmployeeRole

  @Prop({
    type: String,
    required: true,
    default: ''
  })
  role: string

  @Prop({
    type: String,
    required: true,
    enum: Object.values(EmployeeStatus),
    default: EmployeeStatus.Free
  })
  status: EmployeeStatus

  @Prop({
    type: String
  })
  activeStoreId?: string

  @Prop({
    type: String,
    required: true,
    default: ''
  })
  deviceId: string

  @Prop({
    type: Boolean,
    required: true,
    default: true
  })
  isAvailable: boolean
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee)
