export abstract class CQWebSocketError extends Error { }

export class ConnectionError extends CQWebSocketError {
  public readonly name = 'ConnectionError'
}

export class MessageError extends CQWebSocketError {
  public readonly name = 'MessageError'
  public constructor (
    public raw: string,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class TimeoutError extends CQWebSocketError {
  public readonly name = 'TimeoutError'
  public constructor (
    public timeout: number,
    ...args: any[]
  ) {
    super(...args)
  }
}
