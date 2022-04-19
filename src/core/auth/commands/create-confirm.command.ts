import { Command } from 'src/shared/interfaces/command.interface'
import { AuthService } from '../auth.service'
import { AuthSlot } from '../auth.slot'
import { CreateConfirmDTO } from '../dto/create-confirm.dto'
import { ConfirmToken } from '../schemas/confirm-token.schema'

export class CreateConfirmCommand implements Command<ConfirmToken> {
  constructor(
    private readonly service: AuthService,
    private readonly slot: AuthSlot,
    private readonly data: CreateConfirmDTO
  ) {}

  async exec(): Promise<ConfirmToken> {
    const confirm = await this.service.createConfirm(this.data)
    this.slot.subject$.next({
      type: 'confirm',
      confirm
    })
    return confirm
  }
}
