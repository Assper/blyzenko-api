export interface SmsChannel {
  send(phone: string | string[], body: string): Promise<boolean>
}
