export type PushPayload = {
  notification: {
    title: string
    body: string
  }
  data: Record<string, unknown>
}

export interface PushChannel {
  send(deviceId: string | string[], body: PushPayload): Promise<boolean>
}
