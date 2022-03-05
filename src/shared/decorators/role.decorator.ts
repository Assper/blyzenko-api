import { SetMetadata } from '@nestjs/common'
import { UserRole } from 'src/core/user/user-role.enum'

export const Role = (...roles: UserRole[]) => SetMetadata('roles', roles)
