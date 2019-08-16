export interface WebSocketBaseOptions {
  accessToken?: string
  secret?: string
  tokenAsQuery: boolean
}

export interface ConnectionOptions extends WebSocketBaseOptions {
  protocol: 'ws' | 'wss'
  host: string
  port: number
  path: string
}
