export abstract class CQWebSocketError extends Error { }

export enum Action {
  SEND = 'send',
  RECV = 'recv',
  CLOSE = 'close'
}

export class StateError extends CQWebSocketError {
  public readonly name = 'StateError'
  public constructor (
    public action: Action,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class AbortError extends CQWebSocketError {
  public readonly name = 'AbortError'
  public constructor (
    public action: Action,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class MessageError extends CQWebSocketError {
  public readonly name = 'MessageError'
  public constructor (
    public data: string,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class TimeoutError extends CQWebSocketError {
  public readonly name = 'TimeoutError'
  public constructor (
    public action: Action,
    public timeout: number,
    ...args: any[]
  ) {
    super(...args)
  }
}
