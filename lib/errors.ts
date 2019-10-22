export abstract class CQWebSocketError extends Error { }

export enum Action {
  SEND = 'send',
  RECV = 'recv',
  CLOSE = 'close'
}

export class StateError extends CQWebSocketError {
  public name = 'StateError'
  public constructor (
    public action: Action,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class AbortError extends CQWebSocketError {
  public name = 'AbortError'
  public constructor (
    public action: Action,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class MessageError extends CQWebSocketError {
  public name = 'MessageError'
  public constructor (
    public message: string,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class UnhandledReponseError extends CQWebSocketError {
  public name = 'UnhandledReponseError'
  public constructor (
    public response: Record<string, any>,
    ...args: any[]
  ) {
    super(...args)
  }
}

export class TimeoutError extends CQWebSocketError {
  public name = 'TimeoutError'
  public constructor (
    public action: Action,
    public timeout: number,
    ...args: any[]
  ) {
    super(...args)
  }
}
